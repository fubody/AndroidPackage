/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')

var WeiboVersionSchema = new mongoose.Schema({
    version_name        :String,
    description         :Boolean
})

/*WeiboVersionSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now();
    }

    next()
})*/

WeiboVersionSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = WeiboVersionSchema