'use strict';
var mongoose = require('mongoose'),
    Task = mongoose.model('Markers');

exports.list_all_marker = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_a_marker = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_marker = function (req, res) {
    Task.findById(req.params.markerId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_marker = function (req, res) {
    Task.findOneAndUpdate({_id: req.params.markerId}, req.body, {new: true}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_marker = function (req, res) {
    Task.remove({
        _id: req.params.markerId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({message: 'Marker successfully deleted'});
    });
};
