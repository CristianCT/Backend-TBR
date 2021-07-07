const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/EstadoController');

router.get('/articles', estadoController.articles);
router.get('/orders', estadoController.orders);

module.exports = router;