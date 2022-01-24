const express = require('express') //-
const morgan = require('morgan') 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

//////////////////////////ROUTES//////////////////////////////////////

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

//////////////////////////APP//////////////////////////////////////
const app = express()



//////////////////////////MONGODB DATABASE//////////////////////////////////////
mongoose
  .connect(process.env.DATABASE_CLOUD, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));


////////////////////////////MIDDLEWARE////////////////////////////////////
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//////////////////////////CORS//////////////////////////////////////
/*If environment is still in dev phase then use CORS with the origin being the client URL*/
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}
//////////////////////////Routes Middleware//////////////////////////////////////

app.use('/api',blogRoutes)  
app.use('/api',authRoutes)  
//it's the same as having it all written out there but we put it somewhere else for clean code purposes

//anytime the app receives a request to the API we will respond with Date in JSON format

//////////////////////////PORT//////////////////////////////////////

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
