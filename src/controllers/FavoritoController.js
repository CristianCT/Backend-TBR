const mysqlConnection = require('../config/database');

module.exports = {

    
    list: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT * FROM FAVORITOS;', (err, rows, fields) => {
                if (!err) {
                    res.json(rows).status(200);

                } else {
                    console.log(err);
                    res.status(404).send({
                        message: 'Se presento un error al obtener los articulos'
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
            const consulta = await mysqlConnection.query(`INSERT INTO FAVORITOS (id_cliente, codigo_articulo) VALUES (${form.id_cliente} , '${form.codigo_articulo}')`, (err, rows, fields) => {
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
            const consulta = await mysqlConnection.query(`DELETE FROM FAVORITOS WHERE id_favorito = ${form.id_favorito};`, (err, rows, fields) => {
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