const mysqlConnection = require('../config/database');

module.exports = {

    list: async(req, res, next) => {

        try {
            const consulta = await mysqlConnection.query('SELECT * FROM FACTURAS', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar las facturas: ${err.sqlMessage}`
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
    add: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`INSERT INTOFACTURAS (codigo_pedido, estado) VALUES (${form.codigo_pedido} , '${form.estado}')`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se agrego una nueva factura con exito'
                    });

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al agregar la factura: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`UPDATE FACTURAS SET estado = '${form.estado}' WHERE id_factura = ${form.id_factura}`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se actualizo el estado de la factura'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al actualizar la factura: ${err.sqlMessage}`
                    });
                }
            });

        } catch (error) {
            res.status(500).send({
                message: '[UPDATE] Ocurrió un error'
            });
            next(error);
        }
    }
}