const User = require('../models/user');
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    //FIND IF NEW USER EXISTS AGAINST DB
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        //OTHERWISE CREATE NEW USER
        const { name, email, password } = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({ name, email, password, profile, username })
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: 'Sign-Up successful - Please Sign-In.'

            })
        })
    })
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    //check if user match
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist, please sign-up.'
            })
        }
        //authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            })

        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token, {expiresIn: '1d'})
        const {_id, username, name, email, role} = user
        return res.json({
            token,
            user: {_id, username, name, email, role}
        })
    })


    //generate a token and send it to client
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Signout Success"
    })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
})