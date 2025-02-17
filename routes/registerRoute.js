const express = require('express');
const router = express.Router();

const registerControl = require('../controllers/registerControl.js');

router.post('/register', registerControl.register);

module.exports = router;