const User = require('../model/User.js');

module.exports = {
    list: async function(){
        const users = User.find().lean();
        return users;
    },

    findUser: async function( nome ){
        const user = await User.findOne({ nome: nome });
        if (!user) return false;

        return user;
    },

    selTicket: async function( req, nome ){
        const user = await User.findOne({ _id: req.user._id });
        for(let i = 0; i < user.tickets.length; i++){
            if(user.tickets[i].nome == nome) return user.tickets[i];
        }
        return false;
    },

    create: async function(nome, senha, tickets, isAdmin){
        const user = await User.findOne({ nome: nome }).lean();
        if (!user){
            try{
                const newUser = new User({
                    nome: nome,
                    senha: senha,
                    tickets: tickets,
                    isAdmin: isAdmin
                })
                await newUser.save();
                return newUser;
            }
            catch(err){
                return err;
            }
            
        }
        return false;
    },

    update: async function(nome, userNovo){
        const user = await User.findOne({ nome: nome }).lean();

        if (!user) return false;

        await User.updateOne({ nome: nome }, { $set: userNovo });
    },

    delete: async function(nome){
        const user = await User.findOne({ nome:nome }).lean();

        if (!user) return false;

        await User.deleteOne({ nome:nome });
        return user;
    },

    insertTicket: async function(req, ticket){
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return false;

        let ticketUser = await this.selTicket(req, ticket.nome);

        if(!ticketUser){
            await User.updateOne({ _id: req.user._id }, { $push: { tickets : ticket } });
            return ticket; //
        }
        else{
            ticketUser.quantidade += ticket.quantidade;
            await User.updateOne({ _id: req.user._id, 'tickets.nome': ticket.nome }, { $set: { 'tickets.$.quantidade': ticketUser.quantidade }});

        }
        return ticketUser;
    },
    
    listTickets: async function( nome ) {
        const user = await User.findOne({ nome: nome }).lean();
        if (!user) return false;
        return user.tickets;
    }

}