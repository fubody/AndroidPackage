/**
 * Created by lijie8 on 2015/1/23.
 */
var Version = require('../models/version')

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
                res.redirect('/version')
            } else {
                _version = new Version({
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