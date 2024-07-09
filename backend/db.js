const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kumarutsav1123:1234567u@cluster0.n8nf0la.mongodb.net/");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
} 