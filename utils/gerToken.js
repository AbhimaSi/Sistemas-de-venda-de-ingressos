const jwt = require('jsonwebtoken');

function gerToken(user){
    const secretKey = 'secr3t_@k2%y';

    const payload = {
      _id: user._id,
      nome: user.nome,
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1hr' });

    return token;
}

module.exports = gerToken;