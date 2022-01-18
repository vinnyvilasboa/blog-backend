const express =  require('express')
const router = express.Router()
const { time } = require('../controllers/blog')


router.get('/', time)

module.exports = router;

//so whatever happens here is called into the server and used as middleware.