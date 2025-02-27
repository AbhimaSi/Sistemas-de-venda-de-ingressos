const jwt = require('jsonwebtoken');
const userService = require('../services/userService.js');

const auth = async (req, res, next) => {
    try{ 
        let token = req.header('Authorization');
        if(!token) token = req.cookies.token;

        if(token.includes("Bearer")) token = token.split(' ')[1];

        const decoded = jwt.verify(token, "secr3t_@k2%y");

        const user = await userService.findUser( decoded.nome );

        req.user = user;
        next();
    }
    
    catch (err) {
        res.status(401).redirect('/oapi/login');
        //res.status(401).send({ error: 'Por favor, autentique-se.' });
    }
}

const authAdmin = async (req, res, next) => {
    try{
        if (req.user.isAdmin === true) {
            next();
        } else {
            res.status(403).send({ error: 'Acesso negado.' });
        }
    }
    
    catch (err) {
        res.status(500).send({ error: 'Houve um erro na autentificação.' });
    }
}

module.exports = { auth, authAdmin };