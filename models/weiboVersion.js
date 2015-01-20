/**
 * Created by lijie8 on 2015/1/20.
 */
var mongoose = require('mongoose')
var WeiboVersionSchema = require('../schemas/weiboVersion')
var WeiboVersion = mongoose.model('task', WeiboVersionSchema)

module.exports = Task