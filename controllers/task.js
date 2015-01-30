/**
 * Created by lijie8 on 2015/1/25.
 */
var Task = require('../models/task')
var Sequence = require('./sequence')
var Config = require('../config/config')
var DateUtil = require('../utils/date_utils')
var Package = require('../utils/package')
var SocketIO = require('../utils/socketio')
var fs = require('fs')
var transfer = require('../utils/transfer')

module.exports.createTask = function (req, res) {
    var taskObj = req.body

    if (taskObj) {
        var _task = get_task_from_req(req)
        Sequence.next_seq_id('task', function (err, seq_value) {
            if (err) {
                console.log(err)
            } else {
                _task.id = seq_value
                _task.save(function (task, err) {
                    if (err) {
                        console.log(err)
                    }
                    SocketIO.task_created(_task)
                    Package.package(_task)
                    res.redirect('/')
                })
            }
        })
    }
}

function get_task_from_req(req) {

    return new Task({
        is_beta: false,
        value_desc: req.body.description,
        status_code: Config.task_status.waiting.code,

        create_at: DateUtil.date_formater(Date()),
        app_version: req.body.version

    });
}

module.exports.fetchAllTasks = function (req, res, next) {
    Task.fetch(function (err, tasks) {
        if (err) {
            console.log(err)
        }
        if (tasks) {
            req.body.tasks = JSON.stringify(tasks)
            next()
        }
    })
}

module.exports.download = function (req, res) {
    var task = {id : req.params.id};
    var root_dir = './build/output/package_'+ task.id + '/';
    var file_path = root_dir + req.query['file_name'];
    transfer.download(req, res, file_path)

    //transfer.download(req, res, file_path);
}