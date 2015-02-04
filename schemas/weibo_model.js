/**
 * Created by lijie8 on 2015/1/23.
 */
var mongoose = require('mongoose')

var ModelSchema = new mongoose.Schema({
    model_name: String,
    git_path:   String,
    description: String,
    tags:   Array
})

ModelSchema.statics = {
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
            findOne({model_name: name}).
            exec(cb)
    }
}

module.exports = ModelSchema