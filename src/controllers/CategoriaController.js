const mysqlConnection = require('../config/database');

module.exports = {

    list: async(req, res, next) => {
        try {
            const consulta = await mysqlConnection.query('SELECT * FROM CATEGORIAS', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar las categorias: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`INSERT INTO CATEGORIAS (nombre_categoria, genero, descripcion) VALUES ('${form.nombre_categoria}' , '${form.genero}', '${form.descripcion	}')`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se agrego una nueva categoria con exito'
                    });

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al agregar la categoria: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`UPDATE CATEGORIAS SET nombre_categoria = '${form.nombre_categoria}', genero = '${form.genero}', descripcion = '${form.descripcion}' WHERE codigo_categoria = ${form.codigo_categoria}`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se actualizo una categoria con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al actualizar la categoria: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`DELETE FROM CATEGORIAS WHERE codigo_categoria = ${form.codigo_categoria};`, (err, rows, fields) => {
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
    }
}