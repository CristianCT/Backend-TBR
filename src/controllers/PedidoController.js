const mysqlConnection = require('../config/database');

module.exports = {

    list: async(req, res, next) => {

        try {
            const consulta = await mysqlConnection.query(`SELECT p.codigo_pedido, p.id_cliente, p.id_estado, p.fecha_entrega, p.fecha_facturacion, p.ciudad, p.direccion, p.valor_domicilio, p.total, c.nombre_cliente, e.nombre_estado FROM PEDIDOS p, CLIENTES c, ESTADO_PEDIDO e WHERE p.id_cliente=c.id_cliente and p.id_estado=e.id_estado_pedido;`, (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar los pedidos: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`INSERT INTO PEDIDOS (id_cliente, id_estado, fecha_entrega, ciudad, direccion, valor_domicilio, total) VALUES (${form.id_cliente} , ${form.id_estado}, '${form.fecha_entrega}', '${form.ciudad}', '${form.direccion}', ${form.valor_domicilio}, ${form.total})`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se agrego un nuevo pedido con exito'
                    });

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al agregar el pedido: ${err.sqlMessage}`
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


    },
    select: async(req, res, next) => {


    }
}