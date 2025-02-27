const Ticket = require('../model/ticket.js');

module.exports = {
    list: async function(){
        const tickets = Ticket.find().lean();
        return tickets;
    },

    findTicket: async function(nome){
        const ticket = await Ticket.findOne({ nome : nome });
        if(ticket){
            return ticket;
        }

        return false;
    },

    create: async function(nome, preco, quantidade){
        const ticket = await Ticket.findOne({ nome : nome });
        if(!ticket){
            try{
                const newTicket = new Ticket({
                    nome: nome,
                    preco: preco,
                    quantidade: quantidade
                })
                await newTicket.save();
                return newTicket;
            }
            catch(err){
                return err;
            }
        }
        return false;
    },

    update: async function(nome, preco, quantidade){
        const ticket = await Ticket.findOne({ nome: nome });

        if (!ticket) return false;

        await Ticket.updateOne({ nome: nome }, { $set: { preco: preco, quantidade: quantidade } });
        return ticket;
    },

    updateName: async function(nome, novoNome){
        const ticketNome = await Ticket.findOne({ nome: nome });
        const ticketNomeNovo = await Ticket.findOne({ nome: novoNome });

        if(ticketNome || !(ticketNomeNovo)) {
            await Ticket.updateOne({ nome: nome }, { $set: {nome: novoNome}});
        }
        return false
    },

    updatePrice: async function(nome, preco){
        const ticket = await Ticket.findOne({ nome: nome });

        if(ticket) {
            await Ticket.updateOne({ nome: nome }, { $set: {preco: preco}});
        }
        return false
    },

    updateAmount: async function(nome, quantidade){
        const ticket = await Ticket.findOne({ nome: nome });

        if(ticket) {
            await Ticket.updateOne({ nome: nome }, { $set: {quantidade: quantidade}});
        }
        return false
    },

    delete: async function(nome){
        const ticket = await Ticket.findOne({ nome:nome });

        if (!ticket) return false;

        await Ticket.deleteOne({ nome:nome });
        return ticket;
    }
}