const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        max: 255,
        trim:true
    },
    lastName:{
        type:String,
        max: 255,
        trim:true
    },
    gender:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
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
    contact:{
        mobile:{
            type:String,
            required:true
        },
        fixed:{
            type:String
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type:String
    }
},{
    timestamps:true
});

studentSchema.methods.generateAuthToken = async function () {
    const student = this;
    const token = await jwt.sign({ _id: student._id.toString() }, process.env.TOKEN_SECRET);
    student.tokens = student.tokens.concat({ token });
    await student.save();
    return token;
}

studentSchema.statics.findByCredentials = async (email, password) => {
    try{
        const student = await Students.findOne({ email });
        if(!student)
            throw new Error();
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch)
            throw new Error();
        return student;
    } catch(e) {
        return "Invalid email or password.";
    }
}

studentSchema.pre('save', async function (next) {
    const student = this;
    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8);
    }
    next();
})

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;