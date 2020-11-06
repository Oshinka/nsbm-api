var express = require('express');
const Payments = require('../database/models/payments');

var router = express.Router();

/* Store payment details */
router.post('/', async (req, res) => {
    const payment = new Payments(req.body);
    
    try{
        await payment.save();
        res.status(201).send(payment);
    } catch(e) {
        res.status(400).send(e.message)
    }
});

module.exports = router;