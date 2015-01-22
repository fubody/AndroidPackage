/**
 * Created by lijie8 on 2015/1/18.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
    id					: String,
    is_beta				: Boolean,
    value_desc			: String,
    status_code		: String,

    create_at			: Date,
    finish_at			: Date,
    app_version		: String,
    ext_values			: Object,

    log_path           : String,
    zip_path           : String,
    apk_path           : String
})

module.exports = TaskSchema