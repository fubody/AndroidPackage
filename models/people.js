/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')
var PeopleSchema = require('../schemas/people')
var People = mongoose.model('people', PeopleSchema)

module.exports = People