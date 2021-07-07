const mysqlConnection = require('../config/database');

module.exports = {

    list: async(req, res, next) => {


    },
    add: async(req, res, next) => {
     
        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`INSERT INTO AGREGADOS_CARRITO (codigo_articulo, id_cliente) VALUES (${form.codigo_articulo} , '${form.id_cliente}')`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se agrego un nuevo articulo con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al agregar el articulo: ${err.sqlMessage}`
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

    delete: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`DELETE FROM AGREGADOS_CARRITO WHERE id_agregados_favorito = ${form.id_agregados_favorito};`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se ha eliminado una categoria con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al eliminar la categoria: ${err.sqlMessage}`
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

