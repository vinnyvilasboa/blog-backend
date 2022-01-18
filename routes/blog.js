const express =  require('express')
const router = express.Router()
// const {time} = require('./controllers/blog')


router.get('/', (req,res) => {
    res.json({time: Date().toString()})
})

module.exports = router;

//so whatever happens here is called into the server and used as middleware.