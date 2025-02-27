const logService = require('../services/logService.js');

exports.listOwn = async (req, res) => {
    try{
        const log = await logService.listOne(req.user._id);
        const args = {
            logs: log.logs.reverse(),
            usuario: req.user.nome
        }
        res.render('logs', args);
        //res.status(200).json(logs);
    }
    catch(err){
        res.status(500).json({ error : "Não foi possível listar logs" });
    }

}

exports.list = async (req, res) => {
    try{
        const logs = logService.list();
        res.status(200).json(logs);
    }
    catch(err){
        res.status(500).json({ error : "Não foi possível listar logs" });
    }
}