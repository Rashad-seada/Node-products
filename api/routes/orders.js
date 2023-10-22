const express = require('express');
const { json } = require('stream/consumers');
const router = express.Router();



router.get('/',(req,res,next) => {
    res.status(200).json({
        status_code : 1,
        message : "Orders were fetched",
    })
})

router.post('/',(req,res,next) => {
    const order = {
        product_id : req.body.productId ,
        quantity : req.body.quantity ,
    }
    res.status(201).json({
        status_code : 1,
        message : "Order were created",
        data : {
            order : order
        }
    })

})

router.get('/:orderId',(req,res,next) => {

    const id = req.params.orderId

    res.status(200).json({
        status_code : 1,
        message : "Order with id "+ id +" was fetched",
    })

})

router.delete('/:orderId',(req,res,next) => {

    const id = req.params.orderId

    res.status(200).json({
        status_code : 1,
        message : "Order with id "+ id +" was deleted",
    })

})



module.exports = router;