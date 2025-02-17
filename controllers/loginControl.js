const authService = require('../services/authService.js');

exports.login = async (req, res) => {
    const { nome, senha } = req.body;

    try{
        const token = await authService.login(nome, senha);
        if(!token){
            return res.status(401).json({ message: 'Acesso negado.' });
        }
    
        return res.status(200).json({ token });
    }
    catch(err){
        return res.status(500).json({ message : 'Ocorreu um erro interno.' })
    }


}