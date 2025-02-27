const mongoose = require('mongoose');
const User = require('./User.js');

const userLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    logs: { type:[String] }
});

const UserLog = mongoose.model("UserLog", userLogSchema);

module.exports = UserLog;