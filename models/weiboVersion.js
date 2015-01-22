/**
 * Created by lijie8 on 2015/1/20.
 */

var db = require('../controllers/db')
var mongoose = db.mongoose;
var WeiboVersionSchema = require('../schemas/weiboVersion')

exports.WeiboVersion = mongoose.model('weibo_version', WeiboVersionSchema);