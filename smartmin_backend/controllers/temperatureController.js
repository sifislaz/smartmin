const Temperature = require('../model/Temperature');
const Room = require("../model/Room");
const alertController = require("./alertController");
const moment = require("moment");


const addNewTempReading = async (req,res)=>{
    var { reading, origin} = req.body;
 
    
    try {
        
        origin.room = await Room.findById( req.params.roomId).lean().exec();
        if(!origin.room){
            res.status(400).json({ 'bad request': 'No such room exists' });
            return
        }

        const result = await Temperature.create({
            "reading": reading,
            "origin": origin
        });
        
        const alert = await alertController.checkTempValue(result);
        if(alert===false){        
            res.status(201).json({ 'success': `New temp reading of ${reading.value} created!` });
    }else{
        res.status(201).json({ 
        'success': `New temp reading of ${reading.value} created!`,
        'warning': 'Alert created!'});
        }
        
       
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

const getTempReading = async(req, res)=>{
    const timeNumber = req.query.timeNumber; 
    const timeScale = req.query.timeScale;

    //timeframe is the date requested in ms since Jan 1st 1970
    const timeframe = new Date(moment().subtract(timeNumber,timeScale).format()).getTime()

    try{
    const result = await Temperature.find({'reading.date' : {$gt: timeframe}, 'origin.room' : req.params.roomId},'reading.value reading.date' ).lean().exec();
    
    const temperature = result.map(({_id,reading:{value, date}})=>{
        return {id:_id, x:date, y:value};
        });

    const x = result.map(({reading:{value}})=>{
        return value;
        });

    var min = x[0];
    var max = x[0];
    var average = 0;
    
    for(var i = 0; i < x.length; i++) {
        if(x[i] < min) min = x[i];
        if(x[i] > max) max = x[i];
        average += x[i];
    }

    if(x.length === 0){
        min = 0;
        max = 0;
        average = 0;
    }
    else{
        average /= x.length;
    }
    
    
    res.status(200).json({
        "temp": temperature,
        "averageTemp":average,
        "maximumTemp":max,
        "minimumTemp":min})

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }


}


module.exports = {
    addNewTempReading,
    getTempReading
}