const path = require('path');

module.exports = {
    detail: (req,res) => {
        res.render('product/productDetail');
    },
    create: (req,res) =>{
        res.render('product/createProduct');
    },
    edit: (req,res) =>{
        res.render('product/editProduct');
    }
}