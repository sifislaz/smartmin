const Humidity = require('../model/Humidity');
const Temperature = require('../model/Temperature');
const Room = require("../model/Room");
const Alert = require("../model/Alert");


const checkTempValue = async (temp)=>{
    let idealTemp = 22;
    let moderateDeviation = 5;
    let severeDeviation = 15;
    let message = {};
    let roomName;

    try{
        roomName = await Room.findById(temp.origin.room, 'name').lean().exec();
        roomName = roomName.name;
    }catch(err){
        console.log(err);}
        
    if(Math.abs(temp.reading.value - idealTemp) < moderateDeviation){
        return false;
    }
    else if(((idealTemp + moderateDeviation)<=temp.reading.value) && (temp.reading.value < (idealTemp + severeDeviation))){  // moderate heat
        message.severity = 'Medium';
        message.origin = roomName;
        message.title = `High temperature`;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((temp.reading.value <= (idealTemp - moderateDeviation))  && ((idealTemp - severeDeviation) < temp.reading.value)){  // moderate cold
        message.severity = 'Medium';
        message.origin = roomName;
        message.title = `Low temperature`;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((idealTemp + severeDeviation) <=(temp.reading.value)){  // severe heat
        message.severity = 'Hazard';
        message.title = `Extremely high temperature`;
        message.origin = roomName;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((temp.reading.value)<= (idealTemp - severeDeviation)) {  // severe cold
        message.severity = 'Hazard';
        message.origin = roomName;
        message.title = `Extremely low temperature`;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
}

const checkHumValue =  async (hum)=>{
    let idealRH= 50;
    let moderateDeviation = 10;
    let severeDeviation = 25;
    let message = {};
    let roomName;

    try{
        roomName = await Room.findById(hum.origin.room, 'name').lean().exec();
        roomName = roomName.name;
    }catch(err){
        console.log(err);}
        
    if(Math.abs(hum.reading.value - idealRH) < moderateDeviation){
        return false;
    }
    else if(((idealRH + moderateDeviation)<=hum.reading.value) && (hum.reading.value < (idealRH + severeDeviation))){  // moderate humidity
        message.severity = 'Medium';
        message.origin = roomName;
        message.title = `High humidity`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a humidity reading of ${hum.reading.value} RH in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((hum.reading.value <= (idealRH - moderateDeviation))  && ((idealRH - severeDeviation) < hum.reading.value)){  // moderate dryness
        message.severity = 'Medium';
        message.origin = roomName;
        message.title = `Low humidity`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a humidity reading of ${hum.reading.value} RH in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((idealRH + severeDeviation) <=(hum.reading.value)){  // severe humidity
        message.severity = 'Hazard';
        message.title = `Extremely high humidity`;
        message.origin = roomName;
        message.body = `Sensor ${hum.origin.sensorId} has reported a tempeture of ${hum.reading.value} RH in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((hum.reading.value)<= (idealRH - severeDeviation)) {  // severe dryness
        message.severity = 'Hazard';
        message.origin = roomName;
        message.title = `Extremely low humidity`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a  humidity reading of ${hum.reading.value} RH in `
        createAlert(message);
        //doStuff()
        return true;
    }
}


const createAlert = async (info) =>  {
    try{
        const result = await Alert.create(info)
    }catch(err){
        console.log(err);
    }
    
}


module.exports = {
    checkTempValue,
    checkHumValue
}