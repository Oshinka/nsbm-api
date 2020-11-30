const express = require('express');
const Nexmo = require('nexmo');
const router = express.Router();

const nexmo = new Nexmo({
  apiKey: 'ee07b33f',
  apiSecret: 'weTZtuLfX7uK2ZAl',
});

router.post('/', (req, res) => {
    const from = 'Vonage APIs';
    const to = req.body.mobile;
    const text = req.body.message;

    nexmo.message.sendSms(from, to, text, (err, data) => {
        if(err)
            res.status(500).send(err);
        res.status(201).send(data);
    });
});



module.exports = router;