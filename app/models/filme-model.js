const mongoose = require('mongoose');

const FilmeSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    genre: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Filmes', FilmeSchema);