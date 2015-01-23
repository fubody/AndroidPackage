/**
 * Created by zhangqiang5 on 2015/1/21.
 */

var express = require('express');
var mongoose = require('mongoose');
var Task = require('../controllers/TaskCenter');
var WeiboVersion = require('../controllers/WeiboVersionCenter');
var router = express.Router();


router.get('/hello', Task.hello);
router.get('/', Task.getall);
//router.get('/task', Task.createTask);
router.get('/task', WeiboVersion.getAllVersion);
router.get('/relation', Task.createRelation);

module.exports = router;
