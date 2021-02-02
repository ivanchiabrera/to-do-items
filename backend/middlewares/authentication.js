var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.verifyToken = function(req, res, next) {
    var token = req.header('token');
    tokenDecoded = jwt.decode(token);

    if (!token) {
        return res.status(500).json({
            verificado: false
        });
    }

    User.findById(tokenDecoded.id)
        .exec(
            (err, user) => {

                if (err) {
                    return res.status(500).json({
                        mensaje: 'Error',
                        erros: err
                    })
                }

                if (!user) {
                    return res.status(500).json({
                        verificado: false
                    });
                }

                jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({
                            ok: false,
                            mensaje: 'Token invalido'
                        });
                    }
                    next();
                })



            }

        )



}