/**
 * Created by lijie8 on 2015/1/23.
 */
module.exports.init_data = function (req, res, next) {
    req.body.service_data = {}
    next()
}

module.exports.turn_to_index = function (req, res) {
    req.body.service_data = JSON.stringify(req.body.service_data)
    res.render('index',req.body)
}

module.exports.turn_to_task = function (req, res) {
    res.render('task', req.body)
}

module.exports.turn_to_version = function(req, res) {
    res.render('version', req.body)
}

module.exports.turn_to_relation = function (req, res) {
    res.render('relation', req.body)
}
