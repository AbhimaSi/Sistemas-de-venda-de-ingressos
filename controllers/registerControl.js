const registerService = require('../services/registerService.js');

exports.register = async (req, res) => {
    const { nome, senha } = req.body;
    const user = await registerService.register(nome, senha);

    return res.status(201).json({ message: 'Cadastro realizado com sucesso!', user });
}