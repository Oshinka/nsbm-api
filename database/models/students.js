const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
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

studentSchema.methods.generateAuthToken = async function () {
    const student = this;
    const token = await jwt.sign({ _id: student._id.toString() }, 'thisisnsbm');
    student.tokens = student.tokens.concat({ token });
    await student.save();
    return token;
}

studentSchema.statics.findByCredentials = async (email, password) => {
    try{
        const student = await Students.findOne({ email });
        if(!student)
            throw new Error();
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new Error();
        return student;
    } catch(e) {
        return "Invalid email and password.";
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