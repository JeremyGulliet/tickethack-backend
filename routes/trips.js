var express = require("express");
var router = express.Router();

const Trip = require('../models/trips');
const Cart = require('../models/cart');

// Route get pour récupérer tous les trajets

router.get("/", (req, res) => {
    Trip.find().then(data => {
        res.json({allTrips: data})
    });
});

// Route get pour chercher un trajet selon la ville de départ, la ville d'arrivée et la date

router.get("/:departure/:arrival/:date", (req, res) => {
        const departure = new RegExp(req.params.departure, 'i');
        const arrival = new RegExp(req.params.arrival, 'i');
        const date = new Date(req.params.date);

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

    Trip.find({departure, arrival, date: {$gte: date, $lt: nextDay} }).then(data => {
        if (data.length > 0) {
            res.json({allTrips: data})
        } else{
            res.json({result: false, Trip: "No trips found"})
        }
    });
});

// route POST pour ajouter le trajet au panier

router.post('/', (req, res) => {
    
    const saveTrip = new Cart({
        departure: req.body.departure,
        arrival: req.body.arrival,
        date: req.body.date,
        price: req.body.price,
        isPaid: false,
    })
    saveTrip.save().then (() => {
        res.json("Trip added!")
    });

});

module.exports = router