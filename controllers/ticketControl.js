const ticketService = require('../services/ticketService.js');
const userService = require('../services/userService.js');

exports.listOwned = async (req, res) => {
    try {
        const tickets = await userService.listTickets( req.user.nome );
        const args = {
            tickets: tickets,
            usuario: req.user.nome
        }
        res.render('inventario', args);
        //return res.status(200).json(tickets);
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao listar tickets possuídos.' });
    }
}

exports.list = async (req, res) => {

    try {
        const tickets = await ticketService.list();
        const args = {
            tickets: tickets,
            usuario: req.user.nome,
            admin: req.user.isAdmin
        }
        res.render('loja', args);
        //return res.status(200).json(tickets);
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao listar tickets disponíveis.' });
    }
}

exports.addTicket = async (req, res) => {
    try{
        const { nome } = req.params;
        const preco = parseInt(req.params.preco);
        const quantidade = parseInt(req.params.quantidade);

        if(isNaN(preco) || isNaN(quantidade)){
            return res.status(400).json({ error: 'Parâmetros inválidos.' });
        }
        const ticket = await ticketService.create(nome, preco, quantidade);

        if(ticket){
            return res.status(201).json({ message: 'Ticket adicionado com sucesso!', ticket });
        }

        res.status(409).json({ error: 'Ticket já existente.' });

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
        return res.status(200).json({ message: 'Ticket removido com sucesso!' });
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
        return res.status(200).json({ message: 'Ticket atualizado com sucesso!', ticket });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar ticket.' });
    }
};