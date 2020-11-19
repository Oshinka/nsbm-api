const express = require('express');
const fs = require('fs');
const PDFDocument = require('../pdfGenerator');

const router = express.Router();

/* POST create pdf */
router.post('/', async (req, res) => {
    // console.log(req.body);
    const receipt = PDFDocument(req.body);
    if (!receipt)
        return res.status(404).send();
    receipt.pipe(fs.createWriteStream('public/javascripts/receipt.pdf'));
    receipt.pipe(res);
});

/* GET pdf */
router.get('/', async (req, res) => {
    var file = fs.createReadStream('public/javascripts/receipt.pdf');
    var stat = fs.statSync('public/javascripts/receipt.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Receipt.pdf"');

    if (!file)
        return res.status(404).send();
    file.pipe(res);
});

module.exports = router;