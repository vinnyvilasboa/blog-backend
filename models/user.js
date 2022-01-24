const mongoose = require('mongoose')
const crypto = require('crypto') //hashes password

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true, //any white space will be removed
        required: true,
        max: 32,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true, 
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true, 
        required: true,
        unique: true,
        lowercase: true,
    
    },
    profile: {
        type: String,
        required: true,

    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    about: {
        type: String
    },
    role: {
        type: Number,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        //reset password, forgot password functionality
        data: String,
        default: ''
    }  
}, {timestamp: true})


//////////////////virtual fields////////////////////////////////
//saves passwords hashed not as the actual passwords////

userSchema
    .virtual('password')
    .set(function(password){
        //create a temp variable called _password
        this._password = password
        //generate salt 
        this.salt = this.makeSalt()
        //encrypt the password
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    });


userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return ''; 
        try {
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt : function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userSchema);