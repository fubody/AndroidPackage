/**
 * Created by zhangqiang5 on 2015/1/21.
 */

var express = require('express');
var mongoose = require('mongoose');

var Task = require('../controllers/task');
var Turn = require('../controllers/turn')
var router = express.Router();

//router.get('/', Task.fetchAllTasks, Turn.turn_to_index);
router.get('/', Task.fetchPartTasks);
router.get('/index', Task.fetchPartTasks);

module.exports = router;
