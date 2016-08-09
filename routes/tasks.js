var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET tasks */
router.get('/', function(req, res, next) {
    var db = req.app.get('db');
    db.collection('tasks').find({$or: [{'status': 'done'}, {'status': 'todo'}]}).toArray(function (err, tasks) {
        if(err){
            res.status(500).send('Error retrieving tasks');
        } else {
            res.json(tasks);
        }
    });
});

/* DELETE tasks */
router.delete('/:id', function(req, res, next) {
    var db = req.app.get('db');
    var taskId = req.params.id;
    console.log(taskId);
    if(!taskId){
        res.status(404).send('A task must be provided');
    } else {
        var query = {id: taskId};
        taskId = new mongodb.ObjectID(taskId);
        db.collection('tasks').deleteOne({'_id': taskId}, function (err, result) {
            if (err) {
                res.status(500).send('Error deleting the task');
            } else if (result.deletedCount < 1) {
                res.status(404).send('The provided task does not exist');
            } else {
                res.json([]);
            }
        });
    }
});

/* ADD tasks */
router.post('/', function(req, res, next) {
    var db = req.app.get('db');
    var task = req.body.task;
    var status = 'todo';
    if(!task){
        res.status(404).send('A task must be provided');
    } else {
        var query = {status: status, task: task};
        db.collection('tasks').insert(query, function(err, record){
            if(err){
                res.status(500).send('Error saving new task');
            } else {
                res.json([]);
            }
        });
    }
});

/* UPDATE tasks */
router.put('/', function(req, res, next) {
    var db = req.app.get('db');
    var taskId = req.body.taskId;
    var status = req.body.status;
    var task = req.body.task;

    if(!task || !status || !taskId){
        res.status(404).send('A task must be provided');
    } else {
        var query = {id: taskId, status: status, task: task};
        db.collection('tasks').updateOne({'_id':taskId}, {$set:{status: status, task: task}})(function (err, result) {
            if(err) {
                res.status(500).send('Error updating the task');
            } else {
                res.json([]);
            }
        });
    }
});

module.exports = router;
