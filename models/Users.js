const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please Enter an Email'],
        unique : [true, 'Email should be unique'],
        lowercase : true,
        validate : [isEmail,'Please Enter a Valid Email']
    },
    password : {
        type : String,
        required : [true, 'Please Enter an Password'],
        minlength : [6,'Password should have a minimum length of 6']
    }
});


//fire a function before a new user has saved to the db
userSchema.pre('save', async function(next)
{
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
