const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./src/routes');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


//Routes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/views', router);

//Iniciar el servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});

module.exports = app;