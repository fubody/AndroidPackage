/**
 * Created by lijie8 on 2015/1/23.
 */
var mongoose = require('mongoose')

var VersionSchema = new mongoose.Schema({
    id: String,
    version_name: String,
    description: String
})

VersionSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    },
    findByName: function(name, cb) {
        return this.
            findOne({version_name: name}).
            exec(cb)
    }
}

module.exports = VersionSchema