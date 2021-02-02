var express = require('express');
var app = express();
var Task = require('../models/task');
var mdAutentificacion = require('../middlewares/authentication');


// ===========================
// NEW
// ===========================

app.post('/new', mdAutentificacion.verifyToken, (req, res) => {

    var body = req.body;

    if (body.description == "" || body.done == "" || body.user_id == "" || !body.description || !body.done || !body.user_id) {
        return res.status(500).json({
            mensaje: 'Error saving task'
        })
    }

    var task = new Task({
        description: body.description,
        done: body.done,
        user_id: body.user_id,
    })

    task.save((err, task) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error saving task'
            })
        }

        res.status(201).json({
            task: task
        });
    })
});

// ===========================
// UPDATE
// ===========================

app.put('/update/:id', mdAutentificacion.verifyToken, (req, res) => {
    var idTask = req.params.id;
    var body = req.body;

    if (body.description == "" || body.done == "" || !body.description || !body.done) {
        return res.status(500).json({
            mensaje: 'Error updating task'
        })
    }

    Task.findById(idTask, (err, task) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error',
            })
        }

        if (!task) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error'
            })
        }

        task.description = body.description;
        task.done = body.done;

        task.save((err, taskSaved) => {
            if (err) {
                return res.status(400).json({
                    mensaje: 'Error',
                    erros: err
                })
            }
            res.status(200).json({
                taskSaved: taskSaved
            });
        })
    });
});

// ===========================
// ALL
// ===========================

app.get('/all/:id', mdAutentificacion.verifyToken, (req, res, next) => {
    var idUser = req.params.id;

    Task.find({ user_id: idUser })
        .exec(
            (err, tasks) => {
                if (err) {
                    return res.status(500).json({
                        mensaje: 'Error',
                        erros: err
                    })
                }

                res.status(200).json({
                    tasks: tasks,
                    total: tasks.length
                });
            })
});

// ===========================
// DELETE
// ===========================

app.delete('/delete/:id', mdAutentificacion.verifyToken, (req, res) => {
    var idTask = req.params.id;

    Task.findByIdAndRemove(idTask, (err, taskDeleted) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error'
            })
        }
        if (!taskDeleted) {
            return res.status(500).json({
                mensaje: 'Error'
            })
        }

        res.status(200).json({
            taskDeleted: taskDeleted
        });

    })
})

module.exports = app;