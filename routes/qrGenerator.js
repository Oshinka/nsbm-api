const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

/* POST create qrcode */
router.post('/', (req, res) => {
    const qrContent = req.body;
    QRCode.toDataURL(`Name: ${qrContent.name} \n Amount: ${qrContent.amount}LKR \n Payment ID: ${qrContent.paymentId}`,
        (err, url) => {
            if (err)
                res.status(500).send(err);
            res.status(200).send(url);
        })
    QRCode.toFile(
        'public/images/qrCode.png',
        `Name: ${qrContent.name} \n Amount: ${qrContent.amount}LKR \n Payment ID: ${qrContent.paymentId}`,
        (err) => {
            if (err)
                res.status(500).send(err);
            res.status(200).send();
        })
});

module.exports = router;