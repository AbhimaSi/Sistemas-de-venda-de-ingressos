const ticketService = require('../services/ticketService.js');
const userService = require('../services/userService.js');

exports.listOwned = async (req, res) => {
    try {
        const tickets = await userService.listTickets( req.user.nome );
        res.status(200).json(tickets);
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao listar tickets possuídos.' });
    }
}

exports.list = async (req, res) => {
    try {
        const tickets = await ticketService.list();
        res.status(200).json(tickets);
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao listar tickets disponíveis.' });
    }
}

exports.addTicket = async (req, res) => {
    try{
        const { nome, preco, quantidade } = req.params;
        const ticket = await ticketService.create(nome, preco, quantidade);
        res.status(201).json({ message: 'Ticket adicionado com sucesso!', ticket });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar ticket.' });
    }
}

exports.removeTicket = async (req, res) => {
    try {
        const { nome } = req.params;
        const ticket = await ticketService.delete(nome);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket não encontrado.' });
        }
        res.status(200).json({ message: 'Ticket removido com sucesso!' });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao remover ticket.' });
    }
}

exports.updateTicket = async (req, res) => {
    try {
        const { nome, preco, quantidade } = req.params;
        const ticket = await ticketService.update(nome, preco, quantidade);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket não encontrado.' });
        }
        res.status(200).json({ message: 'Ticket atualizado com sucesso!', ticket });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar ticket.' });
    }
};