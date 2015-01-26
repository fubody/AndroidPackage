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
var port = 11233
var app = express()

mongoose.connect('mongodb://localhost/android_weibo_package')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port);

//设置路由
app.use('/', IndexRoute)
app.use('/task', TaskRoute)
app.use('/version', VersionRoute)
app.use('/relation', RelationRoute)

//app.post('/task/new',Task.createTask)
//
//app.post('/version/new', Version.createVersion)
//
//app.get('/prepare', WeiboModel.init)
//
//app.get('/admin', function(req, res){
//    res.render('admin', {
//        title: '打包平台 后台录入页',
//        person: {
//            name: '',
//            gender: '',
//            title: ''
//        }
//    })
//})
//
//app.get('/person/:id', function(req, res) {
//    var id = req.params.id
//
//    People.findById(id, function(err, person) {
//        res.render('detail', {
//            title: '打包平台 ' + person.name,
//            person: person
//        })
//    })
//})
//
//app.post('/admin/people/new', function (req, res) {
//    console.log(req.body)
//    var personObj = req.body
//    var _id = personObj._id
//
//    if (_id) {
//        People.findById(_id, function(err, person) {
//            if (err) {
//                console.log(err)
//            }
//
//            _person = _.extend(person, personObj)
//            _person.save(function(err, person) {
//                if (err) {
//                    console.log(err)
//                }
//                res.redirect('/person/' + person._id)
//            })
//        })
//    } else {
//        _person = new People({
//            name: personObj.name,
//            gender: personObj.gender,
//            title: personObj.title
//        })
//
//        _person.save(function (err, person) {
//            if (err) {
//                console.log(err)
//            }
//
//            res.redirect('/person/' + person._id)
//        })
//    }
//})
