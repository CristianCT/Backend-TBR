const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');

router.get('/list', categoriaController.list);
router.post('/add', categoriaController.add);
router.post('/update', categoriaController.update);
router.post('/delete', categoriaController.delete);

module.exports = router;