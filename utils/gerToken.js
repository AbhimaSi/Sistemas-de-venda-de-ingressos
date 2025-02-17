const jwt = require('jsonwebtoken');

function gerToken(user){
    const secretKey = process.env.SECRETS;

    const payload = {
      _id: user._id,
      nome: user.nome,
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1hr' });

    return token;
}

module.exports = gerToken;