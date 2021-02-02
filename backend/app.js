// Requires
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
var testRoutes = require('./routes/test');

// Rutas
app.use('/api/test', testRoutes);




var port = process.env.PORT || 3000;

// listen request
app.listen(port, () => {
    console.log('Express server corriendo en el server ' + port);
})