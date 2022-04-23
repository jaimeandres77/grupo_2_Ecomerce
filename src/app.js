const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
// Rutas
const mainRouter = require('./Routes/mainRouter');
const productRouter = require('./Routes/productRouter');
const userRouter = require('./Routes/userRouter');
const SaleRouter = require('./Routes/SaleRouter');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
// Routes API
const userApiRoutes = require('./Routes/api/userApiRouter');
const productApiRoutes = require('./Routes/api/productApiRouter');

const port = process.env.PORT || 3000;

app.use(session({
    secret: "Shh, it's a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);
app.use('/product', productRouter);
app.use('/user',userRouter);
app.use('/sale',SaleRouter);

app.use('/api/users',userApiRoutes);
app.use('/api/products',productApiRoutes);

app.use((req,res,next)=>{
    res.status(404).render('not-found')
})

app.listen(port,() => console.log(`Servidor corriendo en el puerto ${port}`));