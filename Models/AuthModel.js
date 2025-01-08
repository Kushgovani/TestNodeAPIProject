const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userData = mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
            type: String,
    },
    phone:{
        type: String,
    },
});

userData.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next(); 
    } catch (error) {
        next(error); 
    }
});

const user = mongoose.model('UserData',userData);
module.exports = user;