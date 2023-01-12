const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const configEnv = require('dotenv').config({ path: './config.env' })

//create out express app
const app = express()

//Handle CORS + middleware
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//DB stuff  
mongoose.set('strictQuery', true);

const uri = process.env.DB_URI
//console.log(uri)

mongoose.connect(uri,
    //{dbName: 'SmartminDB'},
    {dbName: 'test'},

    {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch((error) => console.log(error))



app.use(bodyParser.json())

app.get("/", (req, res) =>{
    res.send("Running!")
})

const dataRoute = require('./routes/routes');
app.use('/data', dataRoute)

//start server
mongoose.connection.once('open', ()=>{
    console.log("MongoDB connected")
    app.listen(3000, () =>{
        console.log("listeing at port 3000")
    })
    
})


