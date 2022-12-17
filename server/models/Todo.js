const mongoose = require('mongoose');
// const { default: Vedio } = require('../client/src/components/Vedio');
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
    userid: {
        type:String,
        required:true
    },
    todo: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
})

module.exports = Todo = mongoose.model('todos', TodoSchema);