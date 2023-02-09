const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    reading: {
        value:{type: Number, required: true},
        unit: {type: String, default: "C"},
        date: {type: Number, default: Date.now }
    },

    origin: {
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
        sensorId: String
    }
    //

})

module.exports = mongoose.model('Temperature', temperatureSchema);