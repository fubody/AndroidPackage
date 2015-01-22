/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')

var PeopleSchema = new mongoose.Schema({
    name        :String,
    gender      :Boolean,
    title       :String
})

module.exports = PeopleSchema