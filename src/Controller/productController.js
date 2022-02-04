const path = require('path');
const fs = require('fs');

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
        console.log({data: req.body, file: req.file});
        const id = products[products.length - 1].id + 1 || 1;
        const newProduct = {
            id: id,
            ... req.body,
            imagen: req.file.filename,
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
