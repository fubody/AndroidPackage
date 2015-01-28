/**
 * Created by lijie8 on 2015/1/25.
 */
var Task = require('../models/task')
var Sequence = require('./sequence')
var Config = require('../config/config')
var DateUtil = require('../utils/date_utils')
exports.createTask = function (req, res) {
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

exports.fetchAllTasks = function (req, res, next) {
    Task.fetch(function (err, tasks) {
        if (err) {
            console.log(err)
        }
        if (tasks) {
            req.body.tasks = tasks
            next()
        }
    })
}

exports.fetchPartTasks = function(req, res){
    var page = req.query.p<1?1:req.query.p;
    console.log(page);
    var total; //页数
    var pagenum =3; //每页的条数
    if(page){
        page = page;
    }else{
        page = 1;
    }
    Task.find(function(err, task){
        if(err){}else{
            total =  Math.ceil(task.length / pagenum);
        }
    });
    Task.find().limit(pagenum).skip(pagenum*(page-1)).exec(function(err, result){
        if(err){
            console.log(err)
        }else{

            res.render('index',{
                tasks:result,
                page:page,
                total:total
            });
        }
    });
}