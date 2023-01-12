const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Room = require('../model/Room');


const humiditySchema = new Schema({
    reading: {
        value:{type: Number, required: true},
        unit: {type: String, default: "RH"},
        date: { type: Number, default: Date.now }
    },

    origin: {
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' , required: true},
        sensorId: String
    }

})


module.exports = mongoose.model('Humidity', humiditySchema);