/**
 * Created by zhangqiang5 on 2015/1/22.
 */

var express = require('express');
var mongoose = require('mongoose');
var Version = require('../controllers/version');
var Task = require('../controllers/task')
var Turn = require('../controllers/turn')
var router = express.Router();

router.get('/',Version.fetchVersions,Turn.turn_to_task)
router.post('/new',Task.createTask)
router.get('/:id/download',Task.download)

module.exports = router;
