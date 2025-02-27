const registerService = require('../services/registerService.js');

module.exports = {
    register: async(req, res) => {
        const { nome, senha } = req.body;
        const user = await registerService.register(nome, senha);
    
        if(user){
            return res.status(201).json({ message: 'Cadastro realizado com sucesso!', user });
        }
    
        return res.status(409).json({ error: "Nome de usuário já existente." })

    },
    registerForm: async(req, res) => {
        res.render('register');
    }
}