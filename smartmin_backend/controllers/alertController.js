const Humidity = require('../model/Humidity');
const Temperature = require('../model/Temperature');
const Room = require("../model/Room");
const Alert = require("../model/Alert");


const checkTempValue = (temp)=>{
    let idealTemp = 22;
    let moderateDeviation = 5;
    let severeDeviation = 15;
    if(Math.abs(temp.reading.value - idealTemp) < moderateDeviation){
        return false;
    }
    else if(moderateDeviation<=(temp.reading.value - idealTemp)<severeDeviation){  // moderate heat
        message.severity = 'Medium';
        message.origin = temp.origin.room;
        message.title = `High temperature of ${temp.reading.value} °C, in ${temp.origin.room}.`;
        message.body = `Sensor ${temo.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in  ${temp.origin.room}.The heat might be uncomfortable for some.`
        createAlert(message);
        //doStuff()
        return true;
    }
    else if(moderateDeviation<=(idealTemp-temp.reading.value)<severeDeviation){  // moderate cold
        message.severity = 'Medium';
        message.origin = temp.origin.room;
        message.title = `Low temperature of ${temp.reading.value} °C, in ${temp.origin.room}.`;
        message.body = `Sensor ${temo.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in  ${temp.origin.room}.The cold might be uncomfortable for some.`
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((temp.reading.value - idealTemp)>= severeDeviation){  // severe heat
        message.severity = 'Hazard';
        message.origin = temp.origin.room;
        message.title = `Extremely high temperature of ${temp.reading.value} °C, in ${temp.origin.room}.`;
        message.body = `Sensor ${temo.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in  ${temp.origin.room}.The heat might be dangerous for some.`
        createAlert(message);
        //doStuff()
        return true;
    }
    else if((idealTemp-temp.reading.value) >= severeDeviation){  // severe cold
        message.severity = 'Hazard';
        message.origin = temp.origin.room;
        message.title = `Extremely low temperature of ${temp.reading.value} °C, in ${temp.origin.room}.`;
        message.body = `Sensor ${temo.origin.sensorId} has reported a tempeture of ${temp.reading.value} °C in  ${temp.origin.room}.The cold might be dangerous for some.`
        createAlert(message);
        //doStuff()
        return true;
    }
}

const checkHumValue = (hum)=>{
    let idealRH= 50;
    let moderateDeviation = 10;
    let severeDeviation = 25;
    if(Math.abs(hum.reading.value - idealRH) < moderateDeviation){
        return false;
    }
    else if(moderateDeviation<=(hum.reading.value - idealRH)<severeDeviation){  // moderate humidity
        // createAlert(message);
        return true;
    }
    else if(moderateDeviation<=(idealRH-hum.reading.value)<severeDeviation){  // moderate dryness 
        // createAlert(message);
        return true;
    }
    else if((hum.reading.value - idealRH)>= severeDeviation){  // severe humidity
        // createAlert(message);
        return true;
    }
    else if((idealRH-hum.reading.value) >= severeDeviation){  // severe dryness
        // createAlert(message);
        return true;
    }
}


const createAlert = async (info) =>  {
    try{
        const result = await Alert.create({info})
    }catch(err){
        console.log(err);
    }
    
}


module.exports = {
    checkTempValue,
    checkHumValue
}