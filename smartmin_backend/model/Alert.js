const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Alert = require('../model/Room');


const alertSchema = new Schema({
    title:{type:String, required: true},
    body:{type:String, required:true},
    severity:{type:String, required:true, default:"Good"},
    date:{type:Number, default:Date.now},
    origin:{type:String, required:true},
    isRead:{type:Boolean, default:false}
})

module.exports = mongoose.model('Alert', alertSchema);