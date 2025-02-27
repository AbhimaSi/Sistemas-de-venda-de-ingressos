const UserLog = require('../model/UserLog.js');
const date = new Date();

const logger = async (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;

    let log = await UserLog.findOne({userId: req.user._id}); 
    if(!log){
        log = new UserLog({
            userId: req.user._id,
            logs: []
        })
    }

    const logTime = date.toLocaleString();

    res.on('finish', async () => {
        log.logs.push(`${req.user.nome} ${method} : ${url} | ${logTime} | status: ${res.statusCode}`);
        await log.save();
    })
    next();
}

module.exports = logger;