/**
 * Created by lijie8 on 2015/1/23.
 */
var WeiboModel = require('../models/weibo_model')

exports.fetchModels = function (req, res, next) {
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

exports.init = function (req, res) {
    model = new WeiboModel({model_name: 'mediaplayer', git_path:'123', description:'123',tags:[{tag_name:'mediaplayer_500'},{tag_name:'mediaplayer_510'},{tag_name:'mediaplayer_520'}]})
    model.save(function (err, model) {
        if (err) {
            console.log(err)
        }

        if(model) {
            console.log(model)
        }

        res.render('relation',{})
    })
}