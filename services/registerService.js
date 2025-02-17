const userService = require('./userService');

exports.register = async function(nome, senha) {
    const tickets = [];
    const user = await userService.create(nome, senha, tickets);
    return user;
}