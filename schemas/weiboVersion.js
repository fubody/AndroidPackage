/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var WeiboVersionSchema = new Schema({
    version_name        :String,
    description         :String
})

module.exports = WeiboVersionSchema