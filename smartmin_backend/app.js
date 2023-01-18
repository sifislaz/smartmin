const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configEnv = require("dotenv").config({ path: './config.env' });
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
//create out express app
const app = express()


//DB stuff  
mongoose.set('strictQuery', true);
const uri = process.env.DB_URI
mongoose.connect(uri,
    //{dbName: 'SmartminDB'},
     {dbName: 'test'},

    {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch((error) => console.log(error))

//Handle CORS + middleware
app.use(credentials)
app.use(function(req, res, next){
    
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); 
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    
    next();
})

//parsing middleware
app.use(express.json())
app.use(cookieParser())

//homepage
app.get("/", (req, res) =>{
    res.send("Running!")
})


//log, in & out 
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))




//verify aprooved users 
//app.use(verifyJWT)


app.use('/data', require('./routes/dataRoutes'))



//start server
mongoose.connection.once('open', ()=>{
    console.log("MongoDB connected")
    app.listen(3000, () =>{
        console.log("listeing at port 3000")
    })
    
})


