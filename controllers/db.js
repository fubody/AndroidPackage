/**
 * Created by zhangqiang5 on 2015/1/21.
 */

var mongoose = require('mongoose');

/*exports.connect = function(){
    mongoose.connect('mongodb://localhost:27017/android_weibo_package');
}*/
mongoose.connect('mongodb://localhost:27017/android_weibo_package');

exports.mongoose = mongoose;