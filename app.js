const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const e = require('express');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=> {
    const error = new Error('Url route not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    res.json({
        status_code : 0,
        message : "There was an error",
        error : {
            message : error.message
        }
    })
})

module.exports = app;