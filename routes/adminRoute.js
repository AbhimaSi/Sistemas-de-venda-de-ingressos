const express = require('express');
const router = express.Router();

const ticketControl = require('../controllers/ticketControl.js');

router.post('/loja/add/:nome/:preco/:quantidade', ticketControl.addTicket);        // Adicionar ticket (admin)
router.delete('/loja/remove/:nome', ticketControl.removeTicket);                   // Remover ticket (admin)
router.put('/loja/update/:nome/:preco/:quantidade', ticketControl.updateTicket);   // Atualizar ticket (admin)



module.exports = router;