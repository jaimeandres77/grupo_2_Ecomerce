const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const mainRouter = require('./Routes/mainRouter');
const productRouter = require('./Routes/productRouter');

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);
app.use('/product', productRouter);

app.listen(port,() => console.log(`Servidor corriendo en el puerto ${port}`));
