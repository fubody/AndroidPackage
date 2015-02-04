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
    console.log(taskObj);
    var selected_models_string = taskObj.selected_models;
    var selected_models;
    if (selected_models_string) {
        selected_models = selected_models_string.split(',');
    }
    for (var i = 0; i < selected_models.length; i++) {
        var model_name = selected_models[i];
        var tag_value = taskObj[model_name];
        console.log(tag_value);
    }
    return;
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
        status_code: Config.task_status.waiting.title,

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
    var task = {id: req.params.id};
    var root_dir = './build/output/package_' + task.id + '/';
    var file_path = root_dir + req.query['file_name'];
    transfer.download(req, res, file_path)

    //transfer.download(req, res, file_path);
}

module.exports.fetchTaskCount = function (req, res, next) {
    Task.count(function (err, count) {
        if (err){
        } else {
            req.body.service_data.page_count = Math.ceil(count/Config.page_zie)
            next()
        }
    })
}

module.exports.fetchPartTasks = function(req, res, next){
    var p = req.query['p'];
    var page;
    if (p && p >= 1) {
        page = p;
    } else {
        page = 1;
    }

    var page_size = Config.page_zie
    Task.find().sort('-id').limit(page_size).skip(page_size*(page-1)).exec(function(err, tasks){
        if(err){
            console.log(err)
        }else{
            req.body.service_data.tasks = tasks
            req.body.service_data.page_index = page
            next()
        }
    });
}