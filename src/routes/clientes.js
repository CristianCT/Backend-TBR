const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

router.get('/list', clienteController.list);
router.post('/login', clienteController.login);
router.post('/register', clienteController.register);
router.put('/update', clienteController.update);
router.delete('/delete', clienteController.delete);

module.exports = router;