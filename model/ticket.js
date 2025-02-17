const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    preco: { type: Number, required: true },
    quantidade: {type: Number, required: true}
})

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;