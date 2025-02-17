const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;