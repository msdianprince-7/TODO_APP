const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
   name:{
    type:String,
    required:[true,'Please provide the name of task'],
    trim:true,
    maxlength:[20,'Maximum length is 20']
   },
   completed:{
    type:Boolean,
    default:false
}
})

module.exports = mongoose.model('Task',taskSchema)