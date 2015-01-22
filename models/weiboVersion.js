/**
 * Created by lijie8 on 2015/1/20.
 */
var mongoose = require('mongoose')
var weiboVersionSchema = require('../schemas/weiboVersion')
var weiboVersion = mongoose.model('task', weiboVersionSchema)

module.exports = weiboVersion