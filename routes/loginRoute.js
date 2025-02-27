const express = require('express');
const router = express.Router();

const { login, loginForm, logout } = require('../controllers/loginControl.js')

router.post('/login', login);
router.get('/logout', logout);

router.get('/login', loginForm);

module.exports = router;