const express = require('express');
const router = express.Router();

const ticketControl = require('../controllers/ticketControl.js');
const buyControl = require('../controllers/buyControl.js');

router.get('/tickets', ticketControl.listOwned);            // Listar possuidos
router.get('/loja', ticketControl.list);                    // Listar disponíveis
router.post('/loja/:nome/:quantidade', buyControl.buy);     // Finalizar compra

module.exports = router;
