var express = require("express");
var router = express.Router();

const Cart = require('../models/cart');

// Route GET

router.get("/", (req, res) => {
    Cart.find({isPaid: false}).then(data => {
        res.json({allTrips: data})
    });
});


// Routes DELETE

router.delete('/', (req, res) => {
    const {id} = req.body;

    Cart.deleteOne(id).then(() => {
        res.json("Trip deleted!")
    })

});




module.exports = router;