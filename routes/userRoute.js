const express = require('express');
const router = express.Router();

const ticketControl = require('../controllers/ticketControl.js');
const buyControl = require('../controllers/buyControl.js');
const logControl = require('../controllers/logControl.js');

router.get('/user/logs', logControl.listOwn);               // Visualizar Histórico
router.get('/user/tickets', ticketControl.listOwned);       // Listar possuidos
router.get('/loja', ticketControl.list);                    // Listar disponíveis
router.post('/loja/:nome/:quantidade', buyControl.buy);     // Finalizar compra

module.exports = router;
