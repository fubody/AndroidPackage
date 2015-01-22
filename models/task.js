/**
 * Created by lijie8 on 2015/1/18.
 */
var db = require('../controllers/db')
var mongoose = db.mongoose;
var TaskSchema = require('../schemas/task');

exports.Task = mongoose.model('package_task', TaskSchema);