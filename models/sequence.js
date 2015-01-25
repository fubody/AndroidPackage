/**
 * Created by lijie8 on 2015/1/25.
 */
var mongoose = require('mongoose')
var SequenceSchema = require('../schemas/task')
var Sequence = mongoose.model('task', SequenceSchema)

module.exports = Sequence