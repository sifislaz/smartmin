
const checkTempValue = (temp)=>{
    let idealTemp = 22;
    let moderateDeviation = 5;
    let severeDeviation = 15;
    if(Math.abs(temp.reading.value - idealTemp) < moderateDeviation){
        return false;
    }
    else if(moderateDeviation<=(temp.reading.value - idealTemp)<severeDeviation){  // moderate heat
        // createAlert(message);
        return;
    }
    else if(moderateDeviation<=(idealTemp-temp.reading.value)<severeDeviation){  // moderate cold
        // createAlert(message);
        return;
    }
    else if((temp.reading.value - idealTemp)>= severeDeviation){  // severe heat
        // createAlert(message);
        return;
    }
    else if((idealTemp-temp.reading.value) >= severeDeviation){  // severe cold
        // createAlert(message);
        return;
    }
}