/**
 * Created by zhangqiang5 on 2015/1/21.
 */

var db = require('./db')
//db.connect();
var mongoose = db.mongoose;
require('../models/task');
var Task = mongoose.model('package_task');

exports.hello = function (req, res){
    res.render('hello', {title:'Hello World!'});
}

exports.getall = function(req, res){
    Task.find(function(err, result){
        if(err){
            console.log(err);
        }
        res.render('index', {tasks:result});
    });
}

/*exports.add = function (req, res){
    console.log('jump to addone');
    res.render('add', {title:'insert one demo'});
}*/

exports.addone = function(req, res){

    var task = new Task({
        id: 1,
        status: '完成',
        create_at: '2015',
        finish_at: '2015',
        app_version: 'weibo_5.1.0',
        desc: 'weibo_5.1.0'
    });

    console.log('insert one task');
    task.save(function(err, result){
        console.log(result);
        res.redirect('/');
    });
}

exports.createTask = function(req, res){
    console.log('jump to creatTask');
    res.render('task', {});
}

exports.createRelation = function(req, res){
    res.render('relation',{});
}

exports.createVersion = function(req, res){
    res.render('version', {});
}
