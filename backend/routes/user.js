var express = require('express');
var app = express();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt'); // hash password
var BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS); // hash password

// ===========================
// REGISTER
// ===========================

app.post('/register', (req, res) => {

    var body = req.body;

    User.findOne({ name: body.name.toLowerCase() })
        .exec(
            (err, user) => {
                if (err) {
                    return res.status(500).json({
                        mensaje: 'Error',
                        erros: err
                    })
                }

                if (body.password == null) {
                    return res.status(500).json({
                        mensaje: 'Error',
                        erros: err
                    })
                }

                if (user === null) {
                    bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS)
                        .then(function(hashedPassword) {
                            var newUser = new User({
                                name: body.name.toLowerCase(),
                                password: hashedPassword,
                            });
                            newUser.save((err, userSaved) => {
                                if (err) {
                                    return res.status(500).json({
                                        ok: false,
                                        mensaje: 'Error saving user',
                                        erros: err
                                    })
                                }

                                res.status(201).json({
                                    ok: true
                                });
                            })
                        })
                        .catch(function(error) {
                            console.log("Error saving user");
                            next();
                        });
                } else {
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error: repeated name'
                    })
                }
            }
        )
});

// ===========================
// LOGIN
// ===========================

app.post('/login', function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;

    User.findOne({ name: name.toLowerCase() })
        .exec(
            (err, user) => {

                if (err) {
                    return res.status(500).json({
                        mensaje: 'Error al logear usuario',
                        erros: err
                    })
                }

                if (!user) {
                    return res.status(500).json({
                        verificado: false
                    });
                }

                bcrypt.compare(password, user.password).then(function(result) {
                    if (result === true) {
                        var payload = {
                            id: user._id
                        };
                        var token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 2419200 }); //604800 una semana
                        res.status(200).json({
                            verificado: true,
                            token: token
                        });
                    } else {
                        res.status(500).json({
                            verificado: false
                        });
                    }
                });


            }

        )
});

module.exports = app;