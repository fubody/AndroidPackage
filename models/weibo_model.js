/**
 * Created by lijie8 on 2015/1/23.
 */
var mongoose = require('mongoose')
var ModelSchema = require('../schemas/weibo_model')
var WeiboModel = mongoose.model('weibo_model', ModelSchema)

module.exports = WeiboModel