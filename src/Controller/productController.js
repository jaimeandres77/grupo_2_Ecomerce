const path = require('path');
const fs = require('fs');

const productFilePath = path.resolve(__dirname,'../databases/productos.json');
const products = JSON.parse(fs.readFileSync(productFilePath,'utf-8'));

module.exports = {
    detail: (req,res) => {
        const id = parseInt(req.params.id);
        const product = products.find(product => product.id === id);
        res.render('product/productDetail',{product});
    },
    create: (req,res) =>{
        res.render('product/createProduct');
    },
    store: (res,req) => {
        // ..
    },
    edit: (req,res) =>{
        res.render('product/editProduct');
    },
    update: (req,res) => {
        // ...
    },
    destroy: (req,res) => {
        // ...
    }
}