const gerToken = require('../utils/gerToken.js');
const userService = require('./userService.js');

exports.login = async function(nome, senha){
    const user = await userService.findUser( nome );

    if(user != false){
        if(user.senha === senha){
            const token = gerToken(user);
            console.log("Login realizado com sucesso! token: " + token);
            return token;
        }
        console.log("Senha inválida.")
        return null;
    }
    console.log("Usuário não encontrado.");
    return null;
}