const path = require('path');

module.exports = {
    detail: (req,res) => {
        res.render('product/productDetail');
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