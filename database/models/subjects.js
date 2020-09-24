const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectCode:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    semester:{
        type:Number,
        required:true,
        validate(value){
            if(value < 1 || value > 8)
                throw new Error('Not a valid semester');
        }
    },
    isCompulsory:{
        type:Boolean,
        default:true
    },
    credits:{
        lecture:{
            type:Number
        },
        practical:{
            type:Number
        }
    }
});

const Subjects = mongoose.model('Subjects', subjectSchema);

module.exports = Subjects;