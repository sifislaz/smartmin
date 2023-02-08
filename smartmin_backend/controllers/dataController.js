const Humidity = require('../model/Humidity');
const Temperature = require('../model/Temperature');
const Room = require("../model/Room");
const Alert = require("../model/Alert");
const alertController = require("./alertController");
const moment = require("moment");


const getAlerts = async (req, res) =>{
    let pageNumber = req.query.pageNumber; //1 index based
    let pageSize = req.query.pageSize;
    let unreadOnly = req.query.unreadOnly;
    let result = {totalAlerts: undefined,totalPages: undefined, pageNumber: undefined, alerts: []};
    try{
        result.pageNumber = Number(pageNumber);
        if(unreadOnly){
            result.totalAlerts = await Alert.count({isRead: false});

            if(result.totalAlerts === 0){result.totalPages = 1;}
            else{result.totalPages = Math.ceil(result.totalAlerts/pageSize);}

            if(pageNumber>result.totalPages){
                return  res.status(400).json({'Bad Request':'Page number exciteds total pages'})
            }

            result.alerts = await Alert.find({isRead: false}).sort({date: 'desc'}).skip((pageNumber-1)*pageSize).limit(pageSize).lean().exec();
        }
        else{
            result.totalAlerts = await Alert.count();

            if(result.totalAlerts === 0){result.totalPages = 1;}
            else{result.totalPages = Math.ceil(result.totalAlerts/pageSize);}

            if(pageNumber>result.totalPages){
                return  res.status(400).json({'Bad Request':'Page number exciteds total pages'})
            }

            result.alerts = await Alert.find().sort({date: 'desc'}).skip((pageNumber-1)*pageSize).limit(pageSize).lean().exec();   
        }

        //change time to readable string
        for(let alert of result.alerts){
            alert.date = new Date(alert.date).toLocaleString('en-GB', {timezone:'Europe/Athens', hour12:false});   
        }
        
        res.status(200).json(result)
    }catch(err){
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

const readAllAlerts = async(req,res)=>{
    try{
        let result = await Alert.updateMany({isRead:false}, {isRead:true});
        res.status(200).json(result)

    }catch(err){
        console.log(err);
        res.status(500).json({'message':err.message});
    }
}

const getCurrentData = async (req,res) =>{

    try{
         let rooms = await Room.find({},'name accessibility').lean().exec();
        //let rooms = await Room.find({}).lean().exec();
        console.log(rooms);
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
    readAllAlerts,
    getCurrentData
}