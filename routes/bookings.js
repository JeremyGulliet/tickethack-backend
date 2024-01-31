var express = require("express");
var router = express.Router();

const Cart = require('../models/cart');


// Route GET

router.get("/", (req, res) => {
    Cart.find({isPaid: true}).then(data => {
        res.json({allTrips: data})
    });
});

// Route PUT

router.put('/', (req, res) => {

    const {id} = req.body;
    Cart.updateOne({id}, {isPaid: true}).then(() => {
        res.json("Bookings updated!")
    })
  });



module.exports = router