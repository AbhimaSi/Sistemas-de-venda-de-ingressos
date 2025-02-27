const mongoose = require('mongoose');
const ticketSchema = require('./ticket.js').schema

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tickets: { type: [ ticketSchema ], default: []},
    isAdmin: { type: Boolean, default: false }
})

const User = mongoose.model('User', userSchema);

module.exports = User;