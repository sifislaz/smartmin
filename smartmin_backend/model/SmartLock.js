const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SmartLockSchema = new Schema({
    reading: {
        lock:{type: Boolean, required: true},
        date: { type: Date, default: Date.now }
    },

    origin: {
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
        sensorId: String
    }

})

module.exports = mongoose.model('SmartLock', SmartLockSchema);