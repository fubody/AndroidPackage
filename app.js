/**
 * Created by lijie8 on 2015/1/18.
 */
var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var indexRouter = require('./routes/index')
var wbvRouter = require('./routes/WeiboVersion')

var bodyParser = require('body-parser')
var port = 8000;
var app = express()


app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use('/', indexRouter);
app.use('/wbv', wbvRouter);

var server_http = require('http').createServer(app);
server_http.listen(port);

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