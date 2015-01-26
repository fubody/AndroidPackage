/**
 * Created by zhangqiang5 on 2015/1/22.
 */

var express = require('express');
var mongoose = require('mongoose');
var Turn = require('../controllers/turn')
var Version = require('../controllers/version')
var router = express.Router();

router.get('/', Turn.turn_to_version)
router.post('/new', Version.createVersion)

module.exports = router;
