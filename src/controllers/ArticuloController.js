const mysqlConnection = require('../config/database');

module.exports = {

    list: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT codigo_articulo, nombre_articulo, referencia, descuento, precio_venta, precio_compra, b.descripcion, round(precio_venta*(1-descuento/100), 2) as valor_final, a.nombre_estado, id_estado, cantidad_disponible FROM ARTICULOS b, ESTADO_ARTICULO a WHERE id_estado=a.id_estado_articulo ORDER BY nombre_articulo', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar los articulo: ${err.sqlMessage}`
                    });
                }
            });


        } catch (error) {
            res.status(500).send({
                message: '[LIST] Ocurrió un error'
            });
            next(error);
        }
    },
    orderAsc: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT codigo_articulo, nombre_articulo, referencia, descuento, precio_venta, precio_compra, descripcion, round(precio_venta*(1-descuento/100), 2) AS valor_final, a.nombre_estado, cantidad_disponible FROM ARTICULOS, ESTADO_ARTICULO a WHERE id_estado=a.id_estado_articulo ORDER BY valor_final;', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al ordenar los articulos de forma ascendente: ${err.sqlMessage}`
                    });
                }
            });

        } catch (error) {
            res.status(500).send({
                message: '[ORDERASC] Ocurrió un error'
            });
            next(error);
        }

    },
    orderDecr: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT codigo_articulo, nombre_articulo, referencia, descuento, precio_venta, precio_compra, descripcion, round(precio_venta*(1-descuento/100), 2) AS valor_final, a.nombre_estado, cantidad_disponible FROM ARTICULOS, ESTADO_ARTICULO a WHERE id_estado=a.id_estado_articulo ORDER BY valor_final desc;', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al ordenar los articulos de forma decreciente: ${err.sqlMessage}`
                    });
                }
            });

        } catch (error) {
            res.status(500).send({
                message: '[ORDERDECR] Ocurrió un error'
            });
            next(error);
        }

    },
    article: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`SELECT codigo_articulo, nombre_articulo, referencia, descuento, precio_venta, precio_compra, b.descripcion, round(precio_venta*(1-descuento/100), 2) as valor_final, a.nombre_estado FROM ARTICULOS b, ESTADO_ARTICULO a WHERE codigo_articulo = ${form.codigo_articulo}`, (err, rows, fields) => {
                if (!err) {

                    res.json(rows[0]).status(200);

                } else {
                    console.log(err.sqlMessage);
                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al obtener el articulo: ${err.sqlMessage}`
                    });
                }
            });


        } catch (error) {
            res.status(500).send({
                message: '[ARTICLE] Ocurrió un error'
            });
            next(error);
        }

    },
    add: async(req, res, next) => {

        const form = req.body;
        try {
            let estado_id = null;
            const consulta1 = await mysqlConnection.query(`SELECT id_estado_articulo FROM ESTADO_ARTICULO WHERE nombre_estado='${form.nombre_estado}';`, (err, rows, fields) => {
                if (!err) {

                    estado_id = rows[0].id_estado_articulo;

                    const consulta = mysqlConnection.query(`INSERT INTO ARTICULOS (id_estado, referencia, nombre_articulo, precio_compra, precio_venta, descuento, descripcion, cantidad_disponible) VALUES (${estado_id} , '${form.referencia}', '${form.nombre_articulo}', ${form.precio_compra}, ${form.precio_venta}, ${form.descuento}, '${form.descripcion}', ${form.cantidad_disponible})`, (err, rows, fields) => {
                        if (!err) {

                            let articulo = null;
                            const consulta0 = mysqlConnection.query(`SELECT codigo_articulo FROM ARTICULOS WHERE referencia = '${form.referencia}';`, (err, rows, fields) => {
                                if (!err) {
                                    articulo = rows[0].codigo_articulo;
                                    for (var x = 0; x < form.categorias.length; x++) {

                                        const consulta1 = mysqlConnection.query(`INSERT INTO ARTICULOS_CATEGORIAS (codigo_articulo, codigo_categoria) VALUES (${articulo}, (SELECT codigo_categoria FROM CATEGORIAS WHERE nombre_categoria='${form.categorias[x]}'));`, (err, rows, fields) => {
                                            if (!err) {
                                                console.log('Articulo categorizado');
                                            } else {

                                                console.log(err.sqlMessage);
                                                res.status(409).send({
                                                    message: `${err.sqlState}, Se presento un error al obtener la categoria: ${err.sqlMessage}`
                                                });
                                            }
                                        });
                                    }
                                    res.status(200).send({
                                        message: `Articulo agregado con exito`
                                    });
                                } else {
                                    console.log(err.sqlMessage);
                                    res.status(409).send({
                                        message: `${err.sqlState}, Se presento un error al obtener el articulo: ${err.sqlMessage}`
                                    });
                                }
                            });

                        } else {
                            console.log(err.sqlMessage);
                            res.status(409).send({
                                message: `${err.sqlState}, Se presento un error al agregar el articulo: ${err.sqlMessage}`
                            });
                        }
                    });

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, El estado no existe: ${err.sqlMessage}`
                    });
                }
            });
        } catch (error) {
            res.status(500).send({
                message: '[ADD] Ocurrió un error'
            });
            next(error);
        }
    },
    update: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`UPDATE ARTICULOS SET id_estado = (SELECT id_estado_articulo FROM ESTADO_ARTICULO WHERE nombre_estado = '${form.nombre_estado}'), referencia = '${form.referencia}', nombre_articulo = '${form.nombre_articulo}', precio_compra = ${form.precio_compra}, precio_venta = ${form.precio_venta}, descuento = ${form.descuento}, descripcion = '${form.descripcion}', cantidad_disponible = ${form.cantidad_disponible} WHERE codigo_articulo = ${form.codigo_articulo}`, (err, rows, fields) => {
                if (!err) {
                    mysqlConnection.query(`DELETE FROM ARTICULOS_CATEGORIAS WHERE codigo_articulo = ${form.codigo_articulo};`, (err, rows, fields) => {
                        if (!err) {
                            for (var x = 0; x < form.categorias.length; x++) {

                                mysqlConnection.query(`INSERT INTO ARTICULOS_CATEGORIAS (codigo_articulo, codigo_categoria) VALUES (${form.codigo_articulo}, (SELECT codigo_categoria FROM CATEGORIAS WHERE nombre_categoria='${form.categorias[x]}'));`, (err, rows, fields) => {
                                    if (!err) {
                                        console.log('Articulo categorizado');
                                    } else {
                                        res.status(409).send({
                                            message: `${err.sqlState}, Se presento un error al obtener la categoria: ${err.sqlMessage}`
                                        });
                                    }
                                });
                            }

                            res.status(200).send({
                                message: 'Se actualizo un articulo'
                            });

                        } else {
                            res.status(409).send({
                                message: `${err.sqlState}, Se presento un error al eliminar una categoria: ${err.sqlMessage}`
                            });
                        }
                    });
                } else {
                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al actualizar el articulo: ${err.sqlMessage}`
                    });
                }
            });

        } catch (error) {
            res.status(500).send({
                message: '[UPDATE] Ocurrió un error'
            });
            next(error);
        }
    },
    delete: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`DELETE FROM ARTICULOS_CATEGORIAS WHERE codigo_articulo = ${form.codigo_articulo};`, (err, rows, fields) => {
                if (!err) {
                    mysqlConnection.query(`DELETE FROM ARTICULOS WHERE codigo_articulo = ${form.codigo_articulo};`, (err, rows, fields) => {
                        if (!err) {
                            res.status(200).send({
                                message: `Se ha eliminado un articulo con exito`
                            });
                        } else {

                            res.status(409).send({
                                message: `${err.sqlState}, Se presento un error al eliminar el articulo: ${err.sqlMessage}`
                            });
                        }
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al eliminar el articulo: ${err.sqlMessage}`
                    });
                }
            });

        } catch (error) {
            res.status(500).send({
                message: '[DELETE] Ocurrió un error'
            });
            next(error);
        }

    },
    select: async(req, res, next) => {


    }
}