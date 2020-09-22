var express = require('express');
var Lecturers = require('../database/models/lecturers');
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

/* POST create one lecturer */
router.post('/', async (req, res) => {
  const lecturer = new Lecturers(req.body);
  try{
      const token = await lecturer.generateAuthToken();
      res.status(201).send({lecturer, token});
  } catch(e) {
      res.status(400).send(e.message);
  }
});

/* POST lecturer login */
router.post('/login', async (req, res) => {
  try {
      const lecturer = await Lecturers.findByCredentials(req.body.email, req.body.password);
      const token = await lecturer.generateAuthToken();
      res.status(200).send({lecturer,token});
  } catch(e) {
      res.status(400).send(e.message);
  }
});

/* POST create lecturer avatar */
router.post('/:id/avatar', avatar.single('avatar'), async (req, res) => {
  const lecturer = await Lecturers.findById(req.params.id);
  req.lecturer = lecturer;
  req.lecturer.avatar = req.file.buffer;
  await req.lecturer.save();
  res.send(req.lecturer);
}, (err, req, res, next) => res.status(404).send({error:err}));

/* GET lecturer avatar */
router.get('/:id/avatar', async (req, res) => {
  try {
      const lecturer = await Lecturers.findById(req.params.id);
      if(!lecturer || !lecturer.avatar)
          throw new Error();
      res.set('Content-Type', 'image/jpg');
      res.send(lecturer.avatar);
  } catch(e) {
      res.status(404).send();
  }
});

/**
 * @swagger
 * /lecturers:
 *  get:
 *   description: Use to request all lecturers
 *   responses:
 *    '200':
 *     description: A successful response
 */
router.get('/', async (req, res) => {
  try{
      const lecturers = await Lecturers.find({});
      if(!lecturers)
          return res.status(404).send();
      res.status(200).send(lecturers);
  } catch(e) {
      res.status(500).send(e.message);
  }
});

/* GET one lecturer */
router.get('/:id', async (req, res) => {
  try{
      const lecturer = await Lecturers.findById(req.params.id);
      if(!lecturer)
          return res.status(404).send();
      res.status(200).send(lecturer);
  } catch(e) {
      res.status(500).send(e.message);
  }
});

/* PATCH update one lecturer */
router.patch('/:id', async (req, res) => {
  try{
      const lecturer = await Lecturers.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if(!lecturer)
          return res.status(404).send();
      res.status(200).send(lecturer);
  } catch(e) {
      res.status(500).send(e.message);
  }
});

/* DELETE lecturer */
router.delete('/:id', async (req, res) => {
  try{
      const lecturer = await Lecturers.findByIdAndDelete(req.params.id);
      if(!lecturer)
          return res.status(404).send();
      res.status(200).send(lecturer);
  } catch(e) {
      res.status(500).send(e.message);
  }
});

module.exports = router;
