/**
 * Created by lijie8 on 2015/1/23.
 */
var Path = require('path');
var fs = require('fs')
var WeiboModel = require('../models/weibo_model');
child_process = require('child_process');
var i = 0;
var models_with_tag = new Array();

var root_dir = Path.resolve(process.argv[1],'../'),
    build_root_dir = Path.join(root_dir, 'build'),
    script_root_dir = Path.join(build_root_dir, 'script'),
    cache_root_dir = Path.join(build_root_dir, 'cache'),
    source_root_dir = Path.join(build_root_dir, 'source');

module.exports.fetchModels = function (req, res, next) {
    WeiboModel.fetch(function (err, models) {
        if (err) {
            console.log(err)
        }
        if (models) {
            req.body.models = models
            next()
        }
    })
}

module.exports.fetchModelTags = function (req, res, next) {
    models_with_tag = req.body.models
    i = 0;
    getModelTags(models_with_tag[i],req, next)
}

function getModelTags(model,req, next) {
    if (model) {
        var git_absolute_path = Path.join(build_root_dir, model.git_path);
        var result_file = Path.join(cache_root_dir, model.model_name + '_tags.txt');
        var shell_args = [];
        shell_args[shell_args.length] = git_absolute_path;
        shell_args[shell_args.length] = result_file;
        var shell_cmd = Path.join(script_root_dir, 'getTags.bat')

        var stdout_ws = fs.openSync(Path.join(script_root_dir, 'tags_stdout'), 'a');
        var stderr_ws = fs.openSync(Path.join(script_root_dir, 'tags_stderr'), 'a');
        var shell_process = child_process.spawn(shell_cmd, shell_args, {stdio: ['ignore', stdout_ws, stderr_ws]});
        shell_process.on('exit', function (code) {
            if (fs.existsSync(result_file)) {
                var result = fs.readFileSync(result_file).toString();
                var tags = result.trim().split('\n');
                models_with_tag[i].tags = tags;
                models_with_tag[i].save();
            }
            i++;
            if (i == models_with_tag.length) {
                req.body.models = models_with_tag;
                next()
            } else {
                getModelTags(models_with_tag[i],req, next)
            }
        });
    }
}

module.exports.init = function (req, res) {
    var models = [
        new WeiboModel({model_name: 'appmarket', git_path:'source/weibo_dev_workset/weibo_dev_appmarket', description:'appmarket'}),
        new WeiboModel({model_name: 'browser', git_path:'source/weibo_dev_workset/weibo_dev_browser', description:'browser'}),
        new WeiboModel({model_name: 'facebook', git_path:'source/weibo_dev_workset/weibo_dev_facebook', description:'facebook'}),
        new WeiboModel({model_name: 'main', git_path:'source/weibo_dev_workset/weibo_dev_main', description:'main'}),
        new WeiboModel({model_name: 'mediaplayer', git_path:'source/weibo_dev_workset/weibo_dev_mediaplayer', description:'mediaplayer'}),
        new WeiboModel({model_name: 'monitor', git_path:'source/weibo_dev_workset/weibo_dev_monitor', description:'monitor'}),
        new WeiboModel({model_name: 'photoalbum', git_path:'source/weibo_dev_workset/weibo_dev_photoalbum', description:'photoalbum'}),
        new WeiboModel({model_name: 'res', git_path:'source/weibo_dev_workset/weibo_dev_res', description:'res'}),
        new WeiboModel({model_name: 'sdk', git_path:'source/weibo_dev_workset/weibo_dev_sdk', description:'sdk'}),
        new WeiboModel({model_name: 'weiyou', git_path:'source/weibo_dev_workset/weibo_dev_weiyou', description:'weiyou'})
    ]
    //var models = new WeiboModel([
    //        {model_name: 'appmarket', git_path:'source/weibo_dev_workset/weibo_dev_appmarket', description:'appmarket'},
    //        {model_name: 'borwser', git_path:'source/weibo_dev_workset/weibo_dev_borwser', description:'borwser'},
    //        {model_name: 'facebook', git_path:'source/weibo_dev_workset/weibo_dev_facebook', description:'facebook'},
    //        {model_name: 'main', git_path:'source/weibo_dev_workset/weibo_dev_main', description:'main'},
    //        {model_name: 'mediaplayer', git_path:'source/weibo_dev_workset/weibo_dev_mediaplayer', description:'mediaplayer'},
    //        {model_name: 'monitor', git_path:'source/weibo_dev_workset/weibo_dev_monitor', description:'monitor'},
    //        {model_name: 'photoalbum', git_path:'source/weibo_dev_workset/weibo_dev_photoalbum', description:'photoalbum'},
    //        {model_name: 'res', git_path:'source/weibo_dev_workset/weibo_dev_res', description:'res'},
    //        {model_name: 'sdk', git_path:'source/weibo_dev_workset/weibo_dev_sdk', description:'sdk'},
    //        {model_name: 'weiyou', git_path:'source/weibo_dev_workset/weibo_dev_weiyou', description:'weiyou'}
    //])
    //models.save(function (err, model) {
    //    if (err) {
    //        console.log(err)
    //    }
    //
    //    if(model) {
    //        console.log(model)
    //    }
    //
    //    res.render('relation',{})
    //})
    for (var i = 0; i < models.length; i++) {
        var model = models[i];
        model.save();
    }
}