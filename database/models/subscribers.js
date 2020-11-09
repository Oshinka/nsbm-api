const mongoose = require('mongoose');
const validator = require('validator');
const dotenv = require('dotenv');

dotenv.config();

const subscribeSchema = new mongoose.Schema({
    name:{
        type:String,
        max: 255,
        trim:true
    },
    email:{
        type:String,
        required:true,
        max: 255,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid email');
        },
        trim: true
    },
    mobile:{
        type:String
    },
    message:{
        type:String
    }
},{
    timestamps:true
});

const Subscribers = mongoose.model('Subscribers', subscribeSchema);

module.exports = Subscribers;