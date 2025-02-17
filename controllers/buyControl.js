const buyService = require('../services/buyService.js');

exports.buy = async (req, res) => {
    try {
        const { nome, quantidade } = req.params;
        const ticket = await buyService.compra(req, nome, quantidade);
        if(!ticket) {
            return res.status(400).json({ error: 'A compra não foi realizada.' });
        }
        res.status(200).json({ message: 'Compra realizada com sucesso!', ticket });
    }
    catch(err) {
        res.status(500).json({ error: 'Erro ao finalizar compra.' });
    }
}