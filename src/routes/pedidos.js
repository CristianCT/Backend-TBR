const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/PedidoController');

router.get('/list', pedidoController.list);
router.post('/add', pedidoController.add);
router.post('/update', pedidoController.update);
router.post('/select', pedidoController.select);


module.exports = router;