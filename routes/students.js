var express = require('express');
var Students = require('../database/models/students');
var multer = require('multer');
var router = express.Router();

const avatar = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|png|jpeg|JPG|PNG|JPEG)$/))
            return cb(new Error('Incorrect file type'));
        cb(undefined,true);
    }
});

/* POST create one student */
router.post('/', async (req, res) => {
    const student = new Students(req.body);
    try{
        const token = await student.generateAuthToken();
        res.status(201).send({student, token});
    } catch(e) {
        res.status(400).send(e.message);
    }
});

/* POST student logn */
router.post('/login', async (req, res) => {
    try {
        const student = await Students.findByCredentials(req.body.email, req.body.password);
        const token = await student.generateAuthToken();
        res.status(200).send({student,token});
    } catch(e) {
        res.status(400).send(e.message);
    }
});

/* POST create student avatar */
router.post('/:id/avatar', avatar.single('avatar'), async (req, res) => {
    const student = await Students.findById(req.params.id);
    req.student = student;
    req.student.avatar = req.file.buffer;
    await req.student.save();
    res.send(req.student);
}, (err, req, res, next) => res.status(404).send({error:err}));

/* GET student avatar */
router.get('/:id/avatar', async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);
        if(!student || !student.avatar)
            throw new Error();
        res.set('Content-Type', 'image/jpg');
        res.send(student.avatar);
    } catch(e) {
        res.status(404).send();
    }
});

/**
 * @swagger
 * /students:
 *  get:
 *   description: Use to request all students
 *   responses:
 *    '200':
 *     description: A successful response
 */
router.get('/', async (req, res) => {
    try{
        const students = await Students.find({});
        if(!students)
            return res.status(404).send();
        res.status(200).send(students);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

/* GET one student */
router.get('/:id', async (req, res) => {
    try{
        const student = await Students.findById(req.params.id);
        if(!student)
            return res.status(404).send();
        res.status(200).send(student);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

/* PATCH update one student */
router.patch('/:id', async (req, res) => {
    try{
        const student = await Students.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if(!student)
            return res.status(404).send();
        res.status(200).send(student);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

/* DELETE student */
router.delete('/:id', async (req, res) => {
    try{
        const student = await Students.findByIdAndDelete(req.params.id);
        if(!student)
            return res.status(404).send();
        res.status(200).send(student);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
