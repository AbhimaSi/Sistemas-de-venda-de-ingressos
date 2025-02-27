const userService = require('./userService');

exports.register = async function(nome, senha) {
    const user = await userService.create(nome, senha, [], false);

    if(user) return user; 

    return false;

}