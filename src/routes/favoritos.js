const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/FavoritoController');

router.get('/list', favoritoController.list);
router.post('/add', favoritoController.add);
router.delete('/delete', favoritoController.delete);
router.post('/select', favoritoController.select);

module.exports = router;