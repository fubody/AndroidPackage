/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
    id					: String,
    is_beta				: Boolean,
    value_desc			: String,//任务描述
    status_code		: String,

    create_at			: String,
    finish_at			: String,
    app_version		: String,

    log_path           : String,
    zip_path           : String,
    apk_path           : String
})

TaskSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({id: id})
            .exec(cb)
    }
}

module.exports = TaskSchema