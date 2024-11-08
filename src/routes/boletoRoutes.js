const express = require('express');
const router = express.Router();
const BoletoController = require('../controllers/boletoController');

router.post('/gerar-boleto', BoletoController.gerarBoleto);
router.post('/atualizar-status-boleto', BoletoController.atualizarStatusBoleto);
router.post('/cancelar-boleto', BoletoController.cancelarBoleto);
router.get('/boletos', BoletoController.listarBoletos);

module.exports = router;