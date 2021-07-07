const mysqlConnection = require('../config/database');

module.exports = {

    articles: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT * FROM ESTADO_ARTICULO', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar los estados del articulo: ${err.sqlMessage}`
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
    orders: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT * FROM ESTADO_PEDIDO', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar los estados del pedido: ${err.sqlMessage}`
                    });
                }
            });
        } catch (error) {
            res.status(500).send({
                message: '[LIST] Ocurrió un error'
            });
            next(error);
        }
    }
}