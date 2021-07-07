const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdministradorController');

router.get('/list', adminController.list);
router.post('/login', adminController.login);
router.post('/register', adminController.register);
router.post('/update', adminController.update);
router.post('/delete', adminController.delete);

module.exports = router;