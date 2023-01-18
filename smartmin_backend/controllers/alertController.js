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
    
    console.log(Math.abs(temp.reading.value - idealTemp), Math.abs(temp.reading.value - idealTemp) < moderateDeviation );
        
    if(Math.abs(temp.reading.value - idealTemp) < moderateDeviation){
        console.log(1);
        return false;
    }
    else if(moderateDeviation<=(temp.reading.value - idealTemp)&& (temp.reading.value - idealTemp)<severeDeviation){  // moderate heat
        console.log(2);
        message.severity = 'Medium';
        message.origin = roomName;
        message.title = `High temperature`;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if(moderateDeviation<=(idealTemp-temp.reading.value)<severeDeviation){  // moderate cold
        console.log(3);
        message.severity = 'Medium';
        message.origin = roomName;
        message.title = `Low temperature`;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((temp.reading.value - idealTemp)>= severeDeviation){  // severe heat
        console.log(4);
        message.severity = 'Hazard';
        message.title = `Extremely high temperature`;
        message.origin = roomName;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((idealTemp-temp.reading.value) >= severeDeviation){  // severe cold
        console.log(5);
        message.severity = 'Hazard';
        message.origin = roomName;
        message.title = `Extremely low temperature`;
        message.body = `Sensor ${temp.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in `
        createAlert(message);
        //doStuff()
        return true;
    }
}

const checkHumValue = (hum)=>{
    let idealRH= 50;
    let moderateDeviation = 10;
    let severeDeviation = 25;
    let message = {};
    if(Math.abs(hum.reading.value - idealRH) < moderateDeviation){
        return false;
    }
    else if(moderateDeviation<=(hum.reading.value - idealRH)<severeDeviation){  // moderate humidity
        message.severity = "Medium";
        message.origin = hum.origin.room;
        message.title = `High humidity of ${hum.reading.value} %, in ${hum.origin.room}`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a humidity of ${hum.reading.value} % in ${hum.origin.room}.`
        createAlert(message);
        return true;
    }
    else if(moderateDeviation<=(idealRH-hum.reading.value)<severeDeviation){  // moderate dryness
        message.severity = "Medium";
        message.origin = hum.origin.room;
        message.title = `Low humidity of ${hum.reading.value} %, in ${hum.origin.room}`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a humidity of ${hum.reading.value} % in ${hum.origin.room}.`;
        createAlert(message);
        return true;
    }
    else if((hum.reading.value - idealRH)>= severeDeviation){  // severe humidity
        message.severity = "Hazard";
        message.origin = hum.origin.room;
        message.title = `High humidity of ${hum.reading.value} %, in ${hum.origin.room}`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a humidity of ${hum.reading.value} % in ${hum.origin.room}.`
        createAlert(message);
        return true;
    }
    else if((idealRH-hum.reading.value) >= severeDeviation){  // severe dryness
        message.severity = "Hazard";
        message.origin = hum.origin.room;
        message.title = `Low humidity of ${hum.reading.value} %, in ${hum.origin.room}`;
        message.body = `Sensor ${hum.origin.sensorId} has reported a humidity of ${hum.reading.value} % in ${hum.origin.room}.`;
        createAlert(message);
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