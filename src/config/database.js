const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'user_database_laudith',
    password: 'userdatabase2021',
    database: 'tbr'

});

mysqlConnection.connect(function(err) {

    if (err) {

        console.log(err);
        return;
    } else {
        console.log('Conexion de base de datos exitosa');
    }

});

module.exports = mysqlConnection;