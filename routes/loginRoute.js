const express = require('express');
const router = express.Router();

const loginControl = require('../controllers/loginControl.js')

router.post('/login', loginControl.login);

module.exports = router;