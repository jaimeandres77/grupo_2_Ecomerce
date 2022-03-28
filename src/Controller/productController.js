const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

const db = require('../database/models');

const productsFilePath = path.resolve(__dirname, '../databases/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    detail: async (req, res) => {
        const id = parseInt(req.params.id);
        const game = await db.Games.findByPk(id, { include: ['genres', 'platforms'] });
        res.render('product/productDetail', { game });
    },

    show: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const inicio = isNaN(page) || page === 1 ? 0 : (page - 1) * 10;
            const count = await db.Games.count();
            const games = await db.Games.findAll({
                attributes: ['id', 'name', 'price', 'image'],
                order: [['name', 'ASC']],
                include: ['genres', 'platforms'],
                limit: 10,
                offset: inicio
            });
            res.render("product/show", { games, count });
        } catch (error) {
            console.log(error);
        }
    },

    create: async (req, res) => {
        try {
            // const game = await db.Games.findOne({where: {id: 1}});
            // await game.setGenres([1]);
            // await game.removeGenres([1]);
            const genres = await db.Genres.findAll();
            const platforms = await db.Platforms.findAll();
            res.render('product/createProduct', { genres, platforms });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },
    createSend: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.errors.length > 0) {
                const genres = await db.Genres.findAll();
                const platforms = await db.Platforms.findAll();
                const oldData = {... req.body,platform: [... req.body?.platform || []],genre: [... req.body?.genre || []]};
                return res.render('product/createProduct', { errors: errors.mapped(), oldData, genres, platforms });
            }
            const { name, sku, price, discount, stock, description, genre, platform } = req.body;
            const game = await db.Games.create({
                name,
                sku,
                price,
                discount: !isNaN(discount) ? discount : 0,
                stock,
                description,
                status: 1,
                image: req.file?.filename || 'default-product.png'
            });
            const relationGenres = await game.setGenres(genre);
            const relationPlatforms = await game.setPlatforms(platform);
            res.redirect('/product/show');
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },
    edit: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const game = await db.Games.findByPk(id, { include: [
                {association: 'genres', attributes: ['id']},
                {association: 'platforms', attributes: ['id']}
            ]});
            const genres = await db.Genres.findAll();
            const platforms = await db.Platforms.findAll();
        res.render('product/editProduct', { game, genres, platforms });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },
    editUpdate: async (req, res) => {
        try {
            const errors = validationResult(req);
            const id = parseInt(req.params.id);
            if (errors.errors.length > 0) {
                const game = await db.Games.findByPk(id, { include: [
                    {association: 'genres', attributes: ['id']},
                    {association: 'platforms', attributes: ['id']}
                ]});
                const genres = await db.Genres.findAll();
                const platforms = await db.Platforms.findAll();
                const oldData = {... req.body,platform: [... req.body?.platform || []],genre: [... req.body?.genre || []]};
                return res.render('product/editProduct', { errors: errors.mapped(), oldData, genres, platforms, game });
            }
            const { name, sku, price, discount, stock, description, genre, platform, sas } = req.body;
            const game = await db.Games.findByPk(id,{include: ['genres',{association: 'platforms',attributes: ['id']}]});
            const relaciones = JSON.parse(JSON.stringify(sas)).split('/');
            game.removePlatforms(relaciones[0].split(','));
            game.setPlatforms(platform);
            game.removeGenres(relaciones[1].split(','));
            game.setGenres(genre);
            const updateGame = await db.Games.update({
                name,
                sku,
                price,
                discount: !isNaN(discount) ? discount : 0,
                stock,
                description,
                image: req.file?.filename || relaciones[2]
            },{where: {id}});
            res.redirect('/product/show');
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    delete: (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find(product => product.id === id);
        console.log(product);
        res.render('product/deleteProduct', { product });
    },

    destroy: (req, res) => {
        const id = parseInt(req.params.id);
        const finalProducts = products.filter(product => product.id !== id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/product/show');
    }
}