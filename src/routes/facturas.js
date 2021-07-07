const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/FacturaController');

router.get('/list', facturaController.list);
router.post('/add', facturaController.add);
router.put('/update', facturaController.update);

module.exports = router;