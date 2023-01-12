const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoorSchema = new Schema({
    reading: {
        opened:{type: Boolean, required: true},
        date: { type: Date, default: Date.now }
    },

    origin: {
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
        sensorId: String
    }
    //TODO add method to check that the door was opened by  smart lock
})

module.exports = mongoose.model('Door', DoorSchema);