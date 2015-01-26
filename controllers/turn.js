/**
 * Created by lijie8 on 2015/1/23.
 */
exports.turn_to_index = function (req, res) {
    res.render('index',req.body)
}

exports.turn_to_task = function (req, res) {
    res.render('task', req.body)
}

exports.turn_to_version = function(req, res) {
    res.render('version', req.body)
}

exports.turn_to_relation = function (req, res) {
    res.render('relation', req.body)
}