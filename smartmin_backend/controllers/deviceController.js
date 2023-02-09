const Room = require("../model/Room");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config({ path: './config.env' });

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

    device.sensValue = req.body.newDeviceValue;
    const indx =  room.sensors.findIndex(sens => sens.sensId === req.body.sensId);
    room.sensors[indx] = device;
    
    const updatedRoom =await room.save();

    changeState(req.body.sensId, req.body.newDeviceValue, room.name);

    return res.status(200).json(updatedRoom.sensors)

    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
    
}


function changeState(device, deviceState, roomName){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let mailInfo = {
        from: `Smartmin System <${process.env.MAIL_USER}>`,
        to: `${process.env.MAIL_ADMIN}`,
        subject: `Device ${device} changed state`,
        text: `Hello,\nThe device ${device} in room ${roomName} changed its state to ${deviceState===true?'on':'off'}.\nRegards,\nSmartmin System`
    }

    try{
        transporter.sendMail(mailInfo);
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    changeDeviceState};