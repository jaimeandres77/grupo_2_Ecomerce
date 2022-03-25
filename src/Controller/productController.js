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
                return res.render('product/createProduct', { errors: errors.mapped(), oldData: req.body, genres, platforms });
            }
            const { name, sku, price, discount, stock, description, genre, platform } = req.body;
            const game = await db.Games.create({
                name,
                sku,
                price,
                discount,
                stock,
                description,
                status: 1,
                image: req.file?.filename || 'default-product.png'
            });
            const relationGenres = await game.setGenres(genre);
            const relationPlatforms = await game.setPlatforms(platform);
            res.redirect('/product/create');
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },
    edit: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const game = db.Games.findByPk(id, { include: ['genres', 'platforms'] });
            const genres = await db.Genres.findAll();
            const platforms = await db.Platforms.findAll();
        res.render('product/editProduct', { game, genres, platforms });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },
    editUpdate: (req, res) => {
        const id = parseInt(req.params.id);
        const productToEdit = products.find(product => product.id === id);

        const product = {
            id,
            ...req.body,
            imagen: productToEdit.imagen,
        };

        const newProducts = products.map(producto => {
            if (producto.id === id) {
                return product;
            }
            return producto;
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        res.redirect('/product/show');
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