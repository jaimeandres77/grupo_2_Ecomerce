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
            const limit = 10;
            const count = await db.Games.count();
            const page = isNaN(req.query.page) || parseInt(req.query.page) <= 1 || parseInt(req.query.page) > parseInt(count / limit) ? 1 : parseInt(req.query.page);
            const games = await db.Games.findAll({
                attributes: ['id', 'name', 'price', 'image'],
                order: [['name', 'ASC']],
                include: ['genres', 'platforms'],
                limit,
                offset: (page - 1) * 10
            });
            res.render("product/show", { games, count, page, limit });
        } catch (error) {
            console.log(error);
        }
    },

    create: async (req, res) => {
        try {
            const genres = await db.Genres.findAll({ order: [['name', 'ASC']] });
            const platforms = await db.Platforms.findAll({ order: [['name', 'ASC']] });
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
                const oldData = { ...req.body, platform: [...req.body?.platform || []], genre: [...req.body?.genre || []] };
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
            const game = await db.Games.findByPk(id, {
                include: [
                    { association: 'genres', attributes: ['id'] },
                    { association: 'platforms', attributes: ['id'] }
                ]
            });
            const genres = await db.Genres.findAll({ order: [['name', 'ASC']] });
            const platforms = await db.Platforms.findAll({ order: [['name', 'ASC']] });
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
                const game = await db.Games.findByPk(id, {
                    include: [
                        { association: 'genres', attributes: ['id'] },
                        { association: 'platforms', attributes: ['id'] }
                    ]
                });
                const genres = await db.Genres.findAll();
                const platforms = await db.Platforms.findAll();
                const oldData = { ...req.body, platform: [...req.body?.platform || []], genre: [...req.body?.genre || []] };
                return res.render('product/editProduct', { errors: errors.mapped(), oldData, genres, platforms, game });
            }
            const { name, sku, price, discount, stock, description, genre, platform, sas } = req.body;
            const game = await db.Games.findByPk(id, { include: ['genres', { association: 'platforms', attributes: ['id'] }] });
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
            }, { where: { id } });
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

    destroy: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const game = await db.Games.findByPk(id, { include: ['genres', { association: 'platforms', attributes: ['id'] }] });
            await game.removeGenres(game.dataValues.genres);
            await game.removePlatforms(game.dataValues.platforms);
            await game.destroy();
            res.redirect('/product/show');
        } catch (error) {
            console.log(error);
            res.send(500);
        }
    }
}