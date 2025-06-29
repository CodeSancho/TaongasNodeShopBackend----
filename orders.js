const express = require('express')

const router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/orders');

const Product = require('../models/products');


router.post('/', (req, res, next) => {
            
    const order = new Order({
                orderId: req.body.orderId,
                product: req.body.productId,
                quantity: req.body.quantity
            })
        order.save()
        .then(result => {
            res.status(201).json({
                message: "Order was created",
                createdOrder: result,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
    }).
    catch(err => { res.status(500).json({

error: err

    })}) })

    


router.get("/", (req, res, next) => {
    Order.find()
        .select("orderID product quantity")
        .exec()
        .then(doc => {
            const response = {
                message: "order retrieved",
                count: doc.length,
                orders: doc.map(doc => {
                    return {
                        orderID: doc.orderID,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

}) })


router.get('/:orderId',(req,res,next) => {

    const id = req.params.orderId;

    Order.findById(id).select("orderID product quantity").exec().then(doc => {console.log(doc)
    if (doc) {
        res.status(200).json({
message: "Order Retrieved",
results: doc,
Request:{
type: "GET",
uri: "http//localhost:3000/orders" + doc._id

}


        }); // Correct chaining
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    }).catch(err => {console.log(err)
        res.status(500).json({
            error:err
        })
    }
    )
    
    })

 router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId; 

    Order.findByIdAndDelete(id).exec()
        .then(result => {
            res.status(200).json({
                message: "order deleted successfully",
                result: result,
                Request:{
                    type: "GET",
                    uri: "http//localhost:3000/orders" + doc._id
                    
                    }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.patch("/:orderId", (req, res) => {
    const id = req.params.productId;
    const updateOps = {};

    // Validate req.body
    if (req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
        for (const key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                updateOps[key] = req.body[key];
            }
        }

        // Perform the update
        Product.updateOne({ _id: id }, { $set: updateOps })
            .exec()
            .then((result) => {
                res.status(200).json({
                    status: "success",
                    message: "order updated successfully",
                    data: {
                        product: result,
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/orders/${id}`,
                        },
                    },
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    message: "Failed to update the product",
                    error: {
                        message: err.message,
                    },
                });
            });
    } else {
        res.status(400).json({
            status: "fail",
            message: "Invalid request body. Ensure it is a JSON object.",
        });
    }
});


    
    module.exports = router;