const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const lecturerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max: 255,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value < 0)
                throw new Error('Age is not be negative');
        }
    },
    email:{
        type:String,
        required:true,
        max: 255,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid email');
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
        type:Buffer
    }
},{
    timestamps:true
});

lecturerSchema.methods.generateAuthToken = async function () {
    const lecturer = this;
    const token = await jwt.sign({ _id: lecturer._id.toString() }, 'thisislec');
    lecturer.tokens = lecturer.tokens.concat({ token });
    await lecturer.save();
    return token;
}

lecturerSchema.statics.findByCredentials = async (email, password) => {
    try{
        const lecturer = await Lecturers.findOne({ email });
        if(!lecturer)
            throw new Error();
        const isMatch = await bcrypt.compare(password, lecturer.password);
        if (!isMatch)
            throw new Error();
        return lecturer;
    } catch(e) {
        return "Invalid email and password.";
    }
}

lecturerSchema.pre('save', async function (next) {
    const lecturer = this;
    if (lecturer.isModified('password')) {
        lecturer.password = await bcrypt.hash(lecturer.password, 8);
    }
    next();
})

const Lecturers = mongoose.model('Lecturers', lecturerSchema);

module.exports = Lecturers;