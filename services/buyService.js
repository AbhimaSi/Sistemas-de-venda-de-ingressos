const Ticket = require('../model/ticket.js');
const userService = require('./userService.js');

async function subtraiDaLoja(ticketUser){
    const ticketLoja = await Ticket.findOne( { nome: ticketUser.nome } );
    ticketLoja.quantidade -= ticketUser.quantidade;
    await ticketLoja.save();
}

exports.compra = async function( req, nome, quantidade ){
    const ticketLoja = await Ticket.findOne({ nome: nome });

    if(!ticketLoja) return false;

    if(ticketLoja.quantidade >= quantidade){
        let ticketUser = await userService.insertTicket(req, ticketLoja)
        await subtraiDaLoja(ticketUser);

        return ticketUser;
    }

    return false;

}