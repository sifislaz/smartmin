const Room = require("../model/Room");

const getAllRooms = async (req,res) =>{
    try{
        const result = await Room.find({}).lean().exec();
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json({ 'message': err.message })
    }
};

const getRoom = async(req, res) =>{
    try{
        const result = await Room.findById(req.params.roomId).lean().exec();
        if(!result) return  res.status(400).json({'Bad Request':'No room with that name exists'});
        return res.status(200).json(result)
    }
    catch(err){
        res.status(500).json({ 'message': err.message })
    } 
};

const createNewRoom = async(req,res) =>{
    const { name, location} = req.body;
    console.log(name)
    try{
        const result = await Room.create({
            "name": name,
            "location": location
        });
         res.status(201).json(result);
    } 
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }

};

const updateRoom = async(req,res) => {
    const { name, location} = req.body;
    try{
        const result = await Room.findOneAndUpdate({'name':name},{'location':location}).exec(); 
         res.status(200).json(result);
    } 
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};
const deleteRoom = async(req, res) =>{
    const roomName = req.body.name;

    try{
        const result = await Room.findOneAndDelete({'name': roomName}).lean().exec();
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json({ 'message': err.message })
    } 
};



const setRoomSensors = async (req, res) =>{
    try{
        console.log(req.body);
        let room = await Room.findById(req.params.roomId).exec();
        for(let sensor of room.sensors){
            if(sensor.sensId===req.body.id){
                sensor.sensValue = req.body.value;
                break;
            }
            else continue;
        }
        const newRoom =await room.save();

        res.status(200).json(newRoom)

    }
    catch(err){
        res.status(500).json({ 'message': err.message })
    } 
};




module.exports = {
    getAllRooms,
    createNewRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    setRoomSensors
}