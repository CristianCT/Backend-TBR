const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/ArticuloController');

router.get('/list', articuloController.list);
router.post('/add', articuloController.add);
router.post('/update', articuloController.update);
router.post('/article', articuloController.article);
router.post('/delete', articuloController.delete);
router.post('/select', articuloController.select);
router.get('/orderasc', articuloController.orderAsc);
router.get('/orderdecr', articuloController.orderDecr);

module.exports = router;