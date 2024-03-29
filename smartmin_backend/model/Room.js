const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {type:String, required: true},
    location: String,
    sensors: [{sensId : String, sensType: String, sensValue: Boolean}],
    accessibility: Boolean
})

module.exports = mongoose.model('Room', roomSchema);