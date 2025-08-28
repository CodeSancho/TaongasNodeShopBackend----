const Order = require('../models/orders')



exports.getOrders = (req, res, next) => {
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

}) }