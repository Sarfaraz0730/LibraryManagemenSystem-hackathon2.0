const mongoose = require('mongoose');
const usersModel = require('./usersModel');
const {Schema} = mongoose;

const bookScema =new Schema({
    title: { type: String, required: true },
    author: { type: String },
    genre: { type: String },
    publication_year: { type: Number },
    copies_available: { type: Number }

})

module.exports = mongoose.model("Books", bookScema);
