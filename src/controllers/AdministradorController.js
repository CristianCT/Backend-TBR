const mysqlConnection = require('../config/database');
var bcrypt = require('bcryptjs');
/* const token = require('../services/token'); */

module.exports = {

    login: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`SELECT * FROM ADMINISTRADORES WHERE email_administrador = '${form.email_administrador}'`, (err, rows, fields) => {
                if (!err) {
                    if (rows == 0) {

                        res.status(404).send({

                            message: 'El email no existe'
                        });

                    } else {
                        let compare = bcrypt.compare(form.password_administrador, rows[0].password_administrador, (err0, res0) => {

                            if (!err0) {

                                if (res0) {

                                    res.json(rows).status(200);
                                } else {
                                    res.status(401).send({
                                        message: 'Contraseña incorrecta'
                                    });
                                }

                            } else {

                                res.status(401).send({
                                    message: 'Se presento un problema con la contraseña'
                                });
                            }
                        });
                    }

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al ingresar: ${err.sqlMessage}`
                    });
                }

            });

        } catch (error) {
            res.status(500).send({
                message: '[LOGIN] Ocurrió un error'
            });
            next(error);
        }
    },
    register: async(req, res, next) => {

        const form = req.body;
        try {
            let password_administrador = await bcrypt.hash(form.password_administrador, 12)
            const consulta = await mysqlConnection.query(`INSERT INTO ADMINISTRADORES (id_administrador, nombre_administrador, email_administrador, telefono_administrador, password_administrador) VALUES (${form.id_administrador}, '${form.nombre_administrador}' , '${form.email_administrador}', ${form.telefono_administrador}, '${password_administrador}')`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se agrego un nuevo administrador con exito'
                    });

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al agregar el administrador: ${err.sqlMessage}`
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
            let password_administrador = await bcrypt.hash(form.password_administrador, 12);
            const consulta = await mysqlConnection.query(`UPDATE ADMINISTRADORES SET nombre_administrador = '${form.nombre_administrador}', telefono_administrador = ${form.telefono_administrador}, email_administrador = '${form.email_administrador}', password_administrador = '${password_administrador}' WHERE id_administrador = ${form.id_administrador}`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se actualizo un administrador con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al actualizar al administrador: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`DELETE FROM ADMINISTRADORES WHERE id_administrador = ${form.id_administrador};`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se ha eliminado un administrador con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al eliminar al administrador: ${err.sqlMessage}`
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
    list: async(req, res, next) => {

        try {
            const consulta = await mysqlConnection.query('SELECT * FROM ADMINISTRADORES', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar los administradores: ${err.sqlMessage}`
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