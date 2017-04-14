var express = require('express');
var router = express.Router();
var BBSService=require('../services/BBSService');
var bbsDao=new BBSService();

var success={"success":true};
var failure={"success":false};

var fs = require('fs');
var async=require('async');

// bbs router

module.exports = router;