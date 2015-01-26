/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose');
var TaskSchema = require('../schemas/task');

Task = mongoose.model('package_task', TaskSchema);

module.exports = Task