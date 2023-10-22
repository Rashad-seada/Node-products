const express = require('express');
const {json} = require('stream/consumers');
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/products')

router.get('/', (req, res, next) => {

    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                status_code: 1,
                message: "Fetched all the data",
                data: {
                    products: docs
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                status_code: 0,
                message: "There was an error during fetching",
                error: {
                    message: error.message
                }
            })
        })

})

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product.save().then(result => {
        res.status(201).json({
            status_code: 1,
            message: "Created product successfuly",
            data: {
                product: product
            }
        })
    }).catch(error => {
        res.status(500).json({
            status_code: 0,
            message: "There was an error",
            error: {
                message: error.message
            }
        })
    });

})

router.get('/:productId', (req, res, next) => {

    const id = req.params.productId;

    if (id === 'special') {
        res.status(200).json({
            status_code: 1,
            message: "You discovered the special ID",
        })
    } else {
        Product.findById(id)
            .exec()
            .then(doc => {

                if (doc) {
                    res.status(200).json({
                        status_code: 1,
                        message: "Product found",
                        data: doc
                    })
                } else {
                    res.status(404).json({
                        status_code: 0,
                        message: "Product not found",
                        data: doc
                    })
                }

            })
            .catch(error => {
                res.status(500).json({
                    status_code: 0,
                    message: "Product not found",
                    error: {
                        message: error.message
                    }
                })
            })
    }


})

router.patch('/:productId', (req, res, next) => {

    const id = req.params.productId;
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                status_code: 1,
                message: "updated product with id " + id,
                data : {
                    product: result
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                status_code: 0,
                message: "There was an error during updating the product",
                error : {
                    message : error.message
                }
            })
        })


})

router.delete('/:productId', (req, res, next) => {

    const id = req.params.productId;

    Product.deleteOne({_id: id})
        .exec()
        .then(result => {
            result.status(200).json({
                status_code: 1,
                message: "deleted product with id " + id + " successfuly",
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                status_code: 0,
                message: "There was an error during deleting the product",
                error: {
                    message: error.message
                }
            })
        })


})

module.exports = router;