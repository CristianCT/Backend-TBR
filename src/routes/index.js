const express = require('express');
const router = express.Router();
const clientesRouter = require('./clientes');
const adminRouter = require('./administradores');
const articulosRouter = require('./articulos');
const categoriasRouter = require('./categorias');
const pedidosRouter = require('./pedidos');
const facturasRouter = require('./facturas');
const favoritosRouter = require('./favoritos');
const carritoRouter = require('./carrito');
const estadosRouter = require('./estados');

router.use('/clients', clientesRouter);
router.use('/admin', adminRouter);
router.use('/articles', articulosRouter);
router.use('/category', categoriasRouter);
router.use('/orders', pedidosRouter);
router.use('/bills', facturasRouter);
router.use('/favorites', favoritosRouter);
router.use('/shoppingcart', carritoRouter);
router.use('/states', estadosRouter);

module.exports = router;