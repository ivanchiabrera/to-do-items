var express = require('express');
var app = express();
var Task = require('../models/task');
var Folder = require('../models/folder');
var mdAutentificacion = require('../middlewares/authentication');


// ===========================
// NEW
// ===========================

app.post('/new', mdAutentificacion.verifyToken, (req, res) => {

    var body = req.body;

    if (body.description == "" || body.user_id == "" || !body.description || !body.user_id) {
        return res.status(500).json({
            mensaje: 'Error saving folder'
        })
    }

    var folder = new Folder({
        description: body.description,
        user_id: body.user_id,
    })

    folder.save((err, folder) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error saving folder'
            })
        }

        res.status(201).json({
            folder: folder
        });
    })
});

// ===========================
// UPDATE
// ===========================

app.put('/update/:id', mdAutentificacion.verifyToken, (req, res) => {
    var idFolder = req.params.id;
    var body = req.body;

    if (body.description == "" || !body.description) {
        return res.status(500).json({
            mensaje: 'Error updating folder'
        })
    }

    Folder.findById(idFolder, (err, folder) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error',
            })
        }

        if (!folder) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error'
            })
        }

        folder.description = body.description;

        folder.save((err, folderSaved) => {
            if (err) {
                return res.status(400).json({
                    mensaje: 'Error',
                    erros: err
                })
            }
            res.status(200).json({
                folderSaved: folderSaved
            });
        })
    });
});

// ===========================
// ALL
// ===========================

app.get('/all/:id', mdAutentificacion.verifyToken, (req, res, next) => {
    var idUser = req.params.id;

    Folder.find({ user_id: idUser })
        .exec(
            (err, folders) => {
                if (err) {
                    return res.status(500).json({
                        mensaje: 'Error',
                        erros: err
                    })
                }

                res.status(200).json({
                    folders: folders,
                    total: folders.length
                });
            })
});

// ===========================
// DELETE
// ===========================

app.delete('/delete/:id', mdAutentificacion.verifyToken, (req, res) => {
    var idFolder = req.params.id;

    Folder.findByIdAndRemove(idFolder, (err, folderDeleted) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error'
            })
        }
        if (!folderDeleted) {
            return res.status(500).json({
                mensaje: 'Error'
            })
        }

        Task.deleteMany({ folder_id: idFolder }).exec((err, tasks) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error',
                    erros: err
                })
            }

            res.status(200).json({
                folderDeleted: folderDeleted
            });

        })



    })
})

module.exports = app;