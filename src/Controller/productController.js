const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

const productsFilePath = path.resolve(__dirname,'../databases/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));

module.exports = {
    detail: (req,res) => {
        res.render('product/productDetail');
    },
    create: (req,res) =>{
        res.render('product/createProduct');
    },
    createSend: (req,res) =>{
        const errors = validationResult(req);
        if(errors.errors.length > 0){
            console.log({oldData: req.body});
            return res.render('product/createProduct',{errors: errors.mapped(), oldData: req.body});
        }
        const id = products[products.length - 1].id + 1 || 1;
        const imagen = req.file?.filename !== undefined ? req.file.filename : 'defaultProduct.jpg';
        const newProduct = {
            id: id,
            ... req.body,
            imagen: imagen,
            descuento: 0,
            stock: 0,
            ventas: 0,
            fechaCreacion: '2022-02-04',
            fechaUltimaModificacion: '2022-02-04'
        };
        products.push(newProduct);
        fs.writeFileSync(path.resolve(__dirname,'../databases/productos.json'),JSON.stringify(products,null,' '));
        res.redirect('/product/create');
    },
    edit: (req,res) =>{
        const id = parseInt(req.params.id);
        const product = products.find(product => product.id === id);
        console.log(product);
        res.render('product/editProduct',{product});
    },
    editUpdate: (req,res) =>{
        
    }
}
