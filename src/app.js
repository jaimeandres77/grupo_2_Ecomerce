const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./Routes/mainRouter');
const productRouter = require('./Routes/productRouter');
const userRouter = require('./Routes/userRouter');

app.use(express.static('public'));
app.use('/', mainRouter);
app.use('/product', productRouter);
app.use('/user', userRouter );
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.listen(3000,() => console.log('Servidor corriendo en el puerto 3000'));

app.get('/productdetail',(req,res) => res.sendFile(path.resolve(__dirname,'./views/productDetail.html')));
