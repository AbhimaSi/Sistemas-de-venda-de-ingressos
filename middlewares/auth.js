const jwt = require('jsonwebtoken');
const userService = require('./userService.js');

const auth = async (req, res, next) => {
    try{ 
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETS);

        const user = await userService.findUser( decoded.nome );

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Por favor, autentique-se.' });
    }
}

const authAdmin = async (req, res, next) => {
    try{
        if (req.user.isAdmin == 'true') {
            next();
        } else {
            res.status(403).send({ error: 'Acesso negado.' });
        }
    } catch (err) {
        res.status(401).send({ error: 'Por favor, autentique-se.' });
    }
};

module.exports = { auth, authAdmin }