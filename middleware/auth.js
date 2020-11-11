const jwt = require('jsonwebtoken');
const Students = require('../database/models/students');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decode = await jwt.verify(token, 'thisisnsbm');
        const student = await Students.findOne({ _id: decode._id, 'tokens.token': token });
        if(!student)
            throw new Error()
        req.token = token;
        req.student = student;
        next();
    } catch(e) {
        res.status(400).send({error:'authentication X'});
    }
}

module.exports = auth;