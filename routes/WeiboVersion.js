/**
 * Created by zhangqiang5 on 2015/1/22.
 */

var express = require('express');
var mongoose = require('mongoose');
var WeiboVersion = require('../controllers/WeiboVersionCenter');
var router = express.Router();


router.get('/', WeiboVersion.getAllVersion);
router.get('/version', WeiboVersion.createVersionQ);
router.post('/version', WeiboVersion.createVersion);

module.exports = router;
