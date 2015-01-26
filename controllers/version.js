/**
 * Created by lijie8 on 2015/1/23.
 */
var Version = require('../models/version')
var Sequence = require('./sequence')

exports.createVersion = function (req, res) {
    var versionObj = req.body

    if (versionObj) {
        var name = versionObj.version_name
        var desc = versionObj.description
        Version.findByName(name,function(err, version){
            if (err) {
                console.log(err)
            }
            if (version) {
                res.render('/version',{err_msg:''})
            } else {
                Sequence.next_seq_id('version', function (err, seq_value) {
                    if (err) {
                        console.log(err)
                    } else {
                        var _version = new Version({
                            id: seq_value,
                            version_name: name,
                            description: desc
                        })
                        _version.save(function(version,err){
                            if (err) {
                                console.log(err)
                            }
                            res.redirect('/task')
                        })
                    }
                })
            }
        })
    }
}

exports.getAllVersion = function (req, res) {
    Version.fetch(function (err, versions) {
        if (err) {
            console.log(err)
        }
        if (versions) {
            res.render('task',{versions:versions})
        }
    })
}

exports.fetchVersions = function (req, res, next) {
    Version.fetch(function (err, versions) {
        if (err) {
            console.log(err)
        }
        if (versions) {
            req.body.versions = versions
            next()
        }
    })
}

exports.updateTags = function(req, res) {
    var data = req.body
    if (data) {
        var version_name = data.version
        var model = data.model
        var tag = data.tag
        Version.findByName(version_name,function(err, version){
            if (err) {
                console.log(err)
            }
            if (version) {
                // to be finished...
            } else {
                // to be finished...
            }
        })
    } else {

    }
}