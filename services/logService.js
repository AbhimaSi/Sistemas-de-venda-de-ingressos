const userLog = require('../model/UserLog.js');

module.exports = {
    listOne: async (userId) => {
        const logs = await userLog.findOne({ userId : userId }).lean();
        return logs;
    },

    list: async () => {
        const logs = userLog.find().lean();
        return logs;
    },

    clear: async (userId) => {
        await userLog.deleteOne({ userId : userId });
    },

    clearAll: async (userId) => {
        await userLog.deleteMany();
    }
}