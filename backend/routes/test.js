var express = require('express');
var app = express();

// ===========================
// PRUEBA
// ===========================

app.get('/get', (req, res) => {

    res.status(201).json({
        ok: 'test'
    });
});

module.exports = app;