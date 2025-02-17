const Ticket = require('../model/ticket.js');

module.exports = {
    list: async function(){
        const tickets = Ticket.find().lean();
        return tickets;
    },

    create: async function(nome, preco, quantidade){
        try{
            const ticket = new Ticket({
                nome: nome,
                preco: preco,
                quantidade: quantidade
            })
            await ticket.save();
            return ticket;
        }
        catch(err){
            return err;
        }
    },

    update: async function(nome, preco, quantidade){
        const ticket = await Ticket.findOne({ nome: nome });

        if (!ticket) return false;

        await Ticket.updateOne({ nome: nome }, { $set: { preco: preco, quantidade: quantidade } });
        return ticket;
    },

    delete: async function(nome){
        const ticket = await Ticket.findOne({ nome:nome });

        if (!ticket) return false;

        await Ticket.deleteOne({ nome:nome });
        return ticket;
    }
}