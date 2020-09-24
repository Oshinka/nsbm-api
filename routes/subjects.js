var express = require('express');
const Students = require('../database/models/students');
var Subjects = require('../database/models/subjects');
var router = express.Router();

/* POST Create subject */
router.post('/', async (req, res) => {
    try {
        const subject = new Subjects(req.body);
        await subject.save();
        res.status(201).send(subject);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

/**
 * @swagger
 * /subjects:
 *  get:
 *   tags: ['Subjects']
 *   summary: Use to request all subjects
 *   responses:
 *    '200':
 *      description: A successful response
 */
router.get('/', async (req, res) => {
    try {
        const subjects = await Subjects.find({});
        if(!subjects)
            return res.status(404).send();
        res.status(200).send(subjects);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

/* GET one subject */
router.get('/:id', async (req, res) => {
    try {
        const subject = await Subjects.findById(req.params.id);
        if(!subject)
            return res.status(404).send();
        res.status(200).send(subject);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

/* PATCH update one subject */
router.patch('/:id', async (req, res) => {
    try {
        const subject = await Subjects.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if(!subject)
            return res.status(404).send();
        res.status(200).send(subject);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

/* DELETE subject */
router.delete('/:id', async (req, res) => {
    try {
        const subject = await Subjects.findByIdAndDelete(req.params.id);
        if(!subject)
            return res.status(404).send();
        res.status(200).send(subject);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;