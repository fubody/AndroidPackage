/**
 * Created by lijie8 on 2015/1/18.
 */
var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
Version = require('./controllers/version')
WeiboModel = require('./controllers/weibo_model')
Task = require('./controllers/task')
Turn = require('./controllers/turn')

IndexRoute = require('./routes/index')
TaskRoute = require('./routes/task')
VersionRoute = require('./routes/version')
RelationRoute = require('./routes/relation')

var bodyParser = require('body-parser')
var port = 8000;
var app = express()

mongoose.connect('mongodb://localhost/android_weibo_package')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))

require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port);

//设置路由
app.use('/', IndexRoute)
app.use('/task', TaskRoute)
app.use('/version', VersionRoute)
app.use('/relation', RelationRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;