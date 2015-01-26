/**
 * Created by lijie8 on 2015/1/23.
 */
var Version = require('../models/version')
var Sequence = require('./sequence')
var _ = require('underscore')

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
                            res.redirect('/relation')
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
                var updatedTags = extendTagsValue(version.related_tags,{model_name:model,tag_name:tag})
                version.related_tags = updatedTags
                _version = _.extend(version)
                _version.save(function(version,err){
                    if (err) {
                        console.log(err)
                    }
                    res.redirect('/')
                })
            } else {
                // to be finished...
            }
        })
    } else {

    }
}

function extendTagsValue(originalTags, newTag) {
    var resultTags = new Array()

    console.log(originalTags.length)
    if(originalTags) {
        for (var i=0;i<originalTags.length;i++) {
            var curTag = originalTags[i]
            if (curTag.model_name != newTag.model_name) {
                resultTags[resultTags.length] = curTag
            }
        }
    }
    resultTags[resultTags.length] = newTag
    return resultTags
}