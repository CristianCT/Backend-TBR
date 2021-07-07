const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/CarritoController');

router.get('/list', carritoController.list);
router.post('/add', carritoController.add);
router.delete('/delete', carritoController.delete);
router.post('/select', carritoController.select);

module.exports = router;