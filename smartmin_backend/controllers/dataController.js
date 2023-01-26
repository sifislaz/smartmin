const Humidity = require('../model/Humidity');
const Temperature = require('../model/Temperature');
const Room = require("../model/Room");
const Alert = require("../model/Alert");
const alertController = require("./alertController");
const moment = require("moment");



const getAlerts = async (req, res)=>{
    try{
        const result = await Alert.find().lean().exec();
        const alert = result.map(({_id,title,body,severity,date,origin})=>{
            return {id:_id, title:title, body:body, severity: severity, date:date, origin:origin};
        });
        res.status(200).json({
            "alert":alert
        })
    }
    catch(err){
        res.status(500).json({'message':err.message});
    }
    
}

const readAlert = async(req,res)=>{
    try{
        let result = await Alert.findById(req.params.alertId);
        result.isRead = true;
        result = await result.save();
        res.status(200).json(result)

    }catch(err){
        res.status(500).json({'message':err.message});
    }
}

const getCurrentData = async (req,res) =>{

    try{
        let rooms = await Room.find({},'name accessibility').lean().exec();
        //console.log(result);
        const result = [];
        for(let obj of rooms){
            let tempObj = {};
            tempObj.name = obj.name;
            tempObj.accessibility = obj.accessibility;
            
            tempObj.temperature = (await Temperature.find({"origin.room": obj._id}, 'reading.value').lean().sort({"reading.date": -1}).limit(1)).pop();
            
            if(tempObj.temperature){
                delete tempObj.temperature._id;
            }
            tempObj.humidity = (await Humidity.find({"origin.room": obj._id}, 'reading.value').lean().sort({"reading.date": -1}).limit(1)).pop();
            if(tempObj.humidity){
                delete tempObj.humidity._id;
            }
            result.push(tempObj)
        }
        
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({'message':err.message});
    }
}

module.exports = {
    getAlerts,
    readAlert,
    getCurrentData
}