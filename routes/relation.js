/**
 * Created by zhangqiang5 on 2015/1/22.
 */

var express = require('express');
var mongoose = require('mongoose');
var Version = require('../controllers/version')
var Model = require('../controllers/weibo_model')
var Turn = require('../controllers/turn')
var router = express.Router();

router.get('/', Version.fetchVersions, Model.fetchModels, Turn.turn_to_relation)

module.exports = router;
