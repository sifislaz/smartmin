const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configEnv = require("dotenv").config({ path: './config.env' });
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");

const dataController  = require('./controllers/dataController');

//create out express app
const app = express()


//DB stuff  
mongoose.set('strictQuery', true);
const uri = process.env.DB_URI
mongoose.connect(uri,
    {dbName: 'SmartminDB'},
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch((error) => console.log(error))

//Handle CORS + middleware
app.use(credentials)

//parsing middleware
app.use(express.json())
app.use(cookieParser())

//homepage
app.get("/", dataController.getCurrentData);


//log, in & out 
app.use('/auth', require('./routes/auth'))
// app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

//see data and change device state only if logged in
app.use('/data', require('./routes/dataRoutes'))
app.use('/device/state', require('./routes/device'))


//start server
mongoose.connection.once('open', ()=>{
    console.log("MongoDB connected")
    app.listen(3000, () =>{
        console.log("listening at port 3000")
    })
    
})


