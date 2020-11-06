const mongoose = require('mongoose');
const validator = require('validator');
const dotenv = require('dotenv');

dotenv.config();

const paymentSchema = new mongoose.Schema({
    student:{
        type:String
    },
    course:{
        type:String
    },
    paidEmail:{
        type:String,
        max: 255,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid email');
        },
        trim: true
    },
    payerId:{
        type:String
    },
    paymentId:{
        type:String,
        required:true
    },
    paymentToken:{
        type:String
    }
},{
    timestamps:true
});

const Payments = mongoose.model('Payments', paymentSchema);

module.exports = Payments;