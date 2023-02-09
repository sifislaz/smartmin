const Room = require("../model/Room");

const changeDeviceState = async (req,res)=>{
    try{
       let room = await Room.findById(req.body.roomId).exec();
   

    if(!room){
       return res.status(400).json({'Bad Request':'No room with that ID exists'});
    }

    let device = room.sensors.find(sens => sens.sensId === req.body.sensId);
    if(!device){
       return res.status(400).json({'Bad Request':'No sensor with that ID exists'});
    }

    if(device.sensValue === req.body.newDeviceValue){
        return res.status(200).json({'No Change': 'Device is already at requsted state'});
    }

    //doStuff()
    device.sensValue = req.body.newDeviceValue;
    const indx =  room.sensors.findIndex(sens => sens.sensId === req.body.sensId);
    room.sensors[indx] = device;
    
    const updatedRoom =await room.save();

    return res.status(200).json(updatedRoom.sensors)

    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
    
}

module.exports = {
    changeDeviceState};