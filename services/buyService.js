const ticketService = require('./ticketService.js');
const userService = require('./userService.js');

async function subtraiDaLoja(ticketUser){
    let ticketLoja = await ticketService.findTicket(ticketUser.nome);
    const novaQuantidade = ticketLoja.quantidade - ticketUser.quantidade;
    ticketService.updateAmount(ticketUser.nome, novaQuantidade);

    await ticketLoja.save();
}

exports.compra = async function( req, nome, quantidade ){
    let ticketLoja = await ticketService.findTicket(nome);
    if(ticketLoja){
        if(ticketLoja.quantidade >= quantidade){
            ticketLoja.quantidade = quantidade;
            let ticketUser = await userService.insertTicket(req, ticketLoja);
            await subtraiDaLoja(ticketLoja);

            return ticketUser;
        }
    }
    return false;
}