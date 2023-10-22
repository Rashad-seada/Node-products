const express = require('express');
const { json } = require('stream/consumers');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        status_code : 1,
        message : "GET OK",
    })
})

router.post('/',(req,res,next) => {
    const product = {
        name : req.body.name ,
        price : req.body.price ,
    }
    res.status(201).json({
        status_code : 1,
        message : "Created product successfuly",
        data : {
            product : product
        }
    })
})

router.get('/:productId',(req,res,next) => {

    const id = req.params.productId;

    if (id === 'special') {
        res.status(200).json({
            status_code : 1,
            message : "You discovered the special ID",
        })
    } else {
        res.status(200).json({
            status_code : 1,
            message : "Details of product with id " + id,
        })
    }
})

router.patch('/:productId',(req,res,next) => {

    const id = req.params.productId;

    res.status(200).json({
        status_code : 1,
        message : "updated product with id " + id,
    })

})

router.delete('/:productId',(req,res,next) => {


    const id = req.params.productId;

    res.status(200).json({
        status_code : 1,
        message : "deleted product with id 1" + id,
    })

})

module.exports = router;