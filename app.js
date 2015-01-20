/**
 * Created by lijie8 on 2015/1/18.
 */
var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var People = require('./models/people')
var bodyParser = require('body-parser')
var port = process.env.PORT || 1000
var app = express()

mongoose.connect('mongodb://localhost/android_weibo_package')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port);

app.get('/', function (req, res) {
    /*People.fetch(function(err, people) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: '打包平台 首页',
            people: people
        })
    })*/
    res.render('index',{
        title: 'abc',
        tasks: [{
            id: 1,
            status: '完成',
            create_at: '2015',
            finish_at: '2015',
            app_version: 'weibo_5.1.0',
            desc: 'weibo_5.1.0'
        }]
    })
})

app.post('/weibo_version/new', function(req, res){

})



app.get('/admin', function(req, res){
    res.render('admin', {
        title: '打包平台 后台录入页',
        person: {
            name: '',
            gender: '',
            title: ''
        }
    })
})

app.get('/person/:id', function(req, res) {
    var id = req.params.id

    People.findById(id, function(err, person) {
        res.render('detail', {
            title: '打包平台 ' + person.name,
            person: person
        })
    })
})

app.post('/admin/people/new', function (req, res) {
    console.log(req.body)
    var personObj = req.body
    var _id = personObj._id

    if (_id) {
        People.findById(_id, function(err, person) {
            if (err) {
                console.log(err)
            }

            _person = _.extend(person, personObj)
            _person.save(function(err, person) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/person/' + person._id)
            })
        })
    } else {
        _person = new People({
            name: personObj.name,
            gender: personObj.gender,
            title: personObj.title
        })

        _person.save(function (err, person) {
            if (err) {
                console.log(err)
            }

            res.redirect('/person/' + person._id)
        })
    }
})