const express = require('express');
const Subscribers = require('../database/models/subscribers');

var router = express.Router();

/* Store subscribers from home page */
router.post('/', async(req, res) => {
    const subscribe = new Subscribers(req.body);

    try {
        await subscribe.save();
        res.status(201).send(subscribe);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;