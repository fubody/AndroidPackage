/**
 * Created by zhangqiang5 on 2015/1/22.
 */

var db = require('./db')
//db.connect();
var mongoose = require('mongoose');
require('../models/weiboVersion')
var WeiboVersion = mongoose.model('weibo_version');

exports.createVersion = function(req, res){
    var weiboVersion = new WeiboVersion({
        version_name : req.body.version_name,
        description :req.body.description
    });

    weiboVersion.save(function(err, result){
        console.log('add a weiboVersion');
        if(err){
            console.log(err);
        }
        if(result){
            res.redirect('task');
        }
    });
}

exports.getAllVersion = function(req, res){
    WeiboVersion.find(function(err, result){
        if(err){
            console.log(err);
        }
        res.render('task',{'weiboVersions': result});
    });
}
