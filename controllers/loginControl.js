const authService = require('../services/authService.js');

module.exports = {
    login : async(req, res) => {
        const { nome, senha } = req.body;
    
        try{
            const token = await authService.login(nome, senha);
            if(!token){
                return res.status(401).json({ error: 'Acesso negado.' });
            }
            res.cookie("token", token);
            return res.status(200).json({ token });
        }
        catch(err){
            return res.status(500).json({ error : 'Ocorreu um erro interno.' })
        }
    },
    logout: async(req, res) => {
        res.clearCookie('token');
        res.redirect('/oapi/login');
    },
    loginForm: async(req, res) => {
        res.render('login');
    }
}