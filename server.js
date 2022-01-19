const express = require('express') //-
const morgan = require('morgan') 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

//bring in routes 
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
//app
const app = express()
// mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useCreateIndex: true, useFindAndModify: false}). then(()=> console.log('DB connected'));
//database
// mongoose.connect(process.env.DATABASE_CLOUD).then(()=> console.log('DB connected'));
mongoose
  .connect(process.env.DATABASE_CLOUD, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}
//routes middleware
app.use('/api',blogRoutes)  
app.use('/api',authRoutes)  
//it's the same as having it all written out there but we put it somewhere else for clean code purposes

//anytime the app receives a request to the API we will respond with Date in JSON format

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
