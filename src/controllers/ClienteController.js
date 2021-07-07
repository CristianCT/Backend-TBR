const mysqlConnection = require('../config/database');
var bcrypt = require('bcryptjs');
/* const token = require('../services/token'); */

module.exports = {

    login: async(req, res, next) => {

        const form = req.body;
        try {
            const consulta = await mysqlConnection.query(`SELECT * FROM CLIENTES WHERE email_cliente = '${form.email_cliente}'`, (err, rows, fields) => {
                if (!err) {
                    if (rows == 0) {

                        res.status(404).send({

                            message: 'El email no existe'
                        });

                    } else {
                        let compare = bcrypt.compare(form.password_cliente, rows[0].password_cliente, (err0, res0) => {

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
            /* console.log(consulta.RowDataPacket()); */
            /* if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user.id, user.rol);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            } */
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
            let password_cliente = await bcrypt.hash(form.password_cliente, 12)
            const consulta = await mysqlConnection.query(`INSERT INTO CLIENTES (nombre_cliente, email_cliente, telefono_cliente, password_cliente) VALUES ('${form.nombre_cliente}' , '${form.email_cliente}', ${form.telefono_cliente}, '${password_cliente}')`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se agrego un nuevo cliente con exito'
                    });

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al agregar el cliente: ${err.sqlMessage}`
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
            let password_cliente = await bcrypt.hash(form.password_cliente, 12);
            const consulta = await mysqlConnection.query(`UPDATE CLIENTES SET nombre_cliente = '${form.nombre_cliente}', telefono_cliente = ${form.telefono_cliente}, email_cliente = '${form.email_cliente}', password_cliente = '${password_cliente}' WHERE id_cliente = ${form.id_cliente}`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se actualizo un cliente con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al actualizar el cliente: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query(`DELETE FROM CLIENTES WHERE id_cliente = ${form.id_cliente};`, (err, rows, fields) => {
                if (!err) {

                    res.status(200).send({
                        message: 'Se ha eliminado un cliente con exito'
                    });
                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al eliminar el cliente: ${err.sqlMessage}`
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
            const consulta = await mysqlConnection.query('SELECT * FROM CLIENTES', (err, rows, fields) => {
                if (!err) {

                    res.json(rows).status(200);

                } else {

                    res.status(409).send({
                        message: `${err.sqlState}, Se presento un error al listar los clientes: ${err.sqlMessage}`
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