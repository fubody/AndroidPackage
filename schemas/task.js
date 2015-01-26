/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
    id					: String,
    is_beta				: Boolean,
    value_desc			: String,
    status_code			: String,

    create_at			: Date,
    finish_at			: Date,
    app_version			: String,

    log_path            :String,
    zip_path            :String,
    apk_path            :String

})

/*TaskSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now();
    }

    next()
})*/

TaskSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = TaskSchema