var express = require('express');
var router = express.Router();
var userService=require('../services/UserService');
var userDao=new userService();


var success={"success":true};
var failure={"success":false};

var async=require('async');

/*用户注册*/
router.post('/register', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var create_time = new Date();
	console.log("user/register:username-->%s,password-->%s,email-->%s,mobile-->%s,create_time-->%s", username, password, email, mobile, create_time);
       userDao.createUser(username, password, email, mobile, create_time, function(err,result){
             if(err){
	              console.error("register--%s",err.stack);
	              return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.affectedRows > 0) {
	              console.log('register success');
	              res.json({"success": true,"data": "注册成功"});
             } else {
	              console.error("register--affectrows:%s",affectedRows);
	              return res.status(500).json({"error":"服务器内部错误","success":false});
             }
       });
});

//用户登录
router.post('/login', function(req,res,next) {
	var username = req.body.username;
	var password = req.body.password;
	req.session.username = username;
	userDao.userLogin(username,password,function(err, result) {
		if(err){
	              console.error("login--%s",err.stack);
	              return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.length > 0) {
             	       console.log("登陆成功", result);
                     req.session.userId = result.id;
             	       res.status(200).json({"success":true,"data":"登陆成功"});
             } else {
             	       res.status(200).json({"success":false,"error":"用户名或密码错误"});
             }
	});
});
//获取用户详细信息
router.post('/getUserInfo', function(req,res,next) {
        var username = req.session.username;
        userDao.userLogin(username, function(err, result) {
            if(err){
                      console.error("login--%s",err.stack);
                      return res.status(500).json({"error":"服务器内部错误","success":false});
                 }
                 if (result.length > 0) {
                           res.status(200).json({"success":true,"data":result});
                 } else {
                           res.status(200).json({"success":false,"error":"用户不存在"});
                 }
        });
});
//修改用户密码
router.post('/revisepsd', function(req,res,next) {
        var username = req.session.username;
        var password = req.body.password;
        var newPsd = req.body.newPsd; 
        userDao.userLogin(username, function(err, result) {
            if(err){
                      console.error("login--%s",err.stack);
                      return res.status(500).json({"error":"服务器内部错误","success":false});
                 }
                 if (result.length > 0) {
                           res.status(200).json({"success":true,"data":result});
                 } else {
                           res.status(200).json({"success":false,"error":"用户不存在"});
                 }
        });
});
//获取ssession中的用户名
router.get('/getSessionName', function(req,res,next){
        console.log("/getSessionName");
        if(req.session.username){
             res.json(({success:true, name:req.session.username}));
        }else{
             res.json(({success:false}));
        }
});
//用户登出
router.get('/logout', function(req, res, next) {
	if (req.session){
              req.session.destroy();
	}
	res.json(success);
});



module.exports = router;