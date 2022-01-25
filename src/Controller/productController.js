const path = require('path');

module.exports = {
    detail: (req,res) => {
        res.render('product/productDetail');
    },

    show: (req,res) => {
        res.render("product/show");
    }
    
}