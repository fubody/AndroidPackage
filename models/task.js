/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')
var TaskSchema = require('../schemas/task')
var Task = mongoose.model('task', TaskSchema)

module.exports = Task