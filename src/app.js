const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
/* Rutas */
const mainRouter = require('./Routes/mainRouter');
const productRouter = require('./Routes/productRouter');
const userRouter = require('./Routes/userRouter');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Shh, it's a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static('public'));
// middleware para recibir la informacion del formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);
app.use('/product', productRouter);
app.use('/user', userRouter );

app.listen(3000,() => console.log('Servidor corriendo en el puerto 3000'));

app.get('/productdetail',(req,res) => res.sendFile(path.resolve(__dirname,'./views/productDetail.html')));
