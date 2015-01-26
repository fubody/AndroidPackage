/**
 * Created by lijie8 on 2015/1/23.
 */
var mongoose = require('mongoose')
var VersionSchema = require('../schemas/version')
var Version = mongoose.model('weibo_version', VersionSchema)

module.exports = Version