const User = require('../models/user');
const shortId = require('shortid')


exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }
        const {name, email, password} = req.body
        let username = shortId.generate()
    })
}   

// const { name, email, password } = req.body
//     res.json({
//         user: { name, email, password }
//     })