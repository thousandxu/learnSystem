var express = require('express');
var router = express.Router();
var userService=require('../services/UserService');
var userDao=new userService();
var courseService=require('../services/CourseService');
var courseDao=new courseService();

var success={"success":true};
var failure={"success":false};

var fs = require('fs');
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
                    userDao.userLogin(username,password,function(err, result) {
                         if (result.length > 0) {
                             var path = "./resources/user" + result[0].id;
                             fs.mkdir(path, function(error) {
                                 if (error) {
                                     console.error(error);
                                 } else {
                                     console.log("创建目录成功");
                                 }
                             });
                         }
                    });
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
             	       // console.log("登陆成功", result);
                          req.session.userId = result[0].id;
             	       res.status(200).json({"success":true,"data":"登陆成功"});
             } else {
             	       res.status(200).json({"success":false,"error":"用户名或密码错误"});
             }
	});
});
//获取用户详细信息
router.get('/getUserInfo', function(req,res,next) {
        var username = req.session.username;
        userDao.selectUser(username, function(err, result) {
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
//更新用户信息
router.post('/updateUserInfo', function(req, res, next) {
       var user = req.body.user;
       console.log(user);
       var userId = user.id;
       var username = user.username;
       var email = user.email;
       var mobile = user.mobile;
       var address = user.address;
       var birth = user.birth;
       var university = user.university;
       userDao.updateUser(userId,username,email,mobile,address,birth,university, function(err, result) {
              if (err) {
                     console.error("login--%s",err.stack);
                     return res.status(500).json({"error":"服务器内部错误","success":false});
              } 
              if (result.affectedRows > 0) {
                     res.status(200).json({"success":true,"data":"修改成功"});
              }
       });
})
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
//获取用户学习课程
router.get('/getUserCourses', function(req, res, next) {
       var userId = req.session.userId;
       console.log("users/getUserCourses:userId-->%s",userId);
       userDao.selectUserCourse(userId, function(err, result) {
             if(err){
                  console.error("login--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.length > 0) {
                   async.each(result, function(item, ecallback) {
                         courseDao.selectChapter(item.courseId, function(error, result) {
                               if(result.length > 0) {
                                    item.courseAllChapter = result.length;
                               }
                               ecallback(error, item);
                         });
                   }, function(error) {
                         // console.log('result0', result);
                         res.status(200).json({"success":true,"data":result});
                         console.log('error', error);
                   }); 
             }
       });

});
//获取用户学习记录
router.get('/getUserLearnRecord', function(req, res, next) {
       var userId = req.session.userId;
       // var from = req.query.from;
       // var to = req.query.to;
       console.log("users/getUserLearnRecord:userId-->%s", userId); 
       userDao.selectUserRecord(userId, function(err, result) {
             if(err){
                  console.error("login--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.length > 0) {
                  res.status(200).json({"success":true,"data":result});
             }
       });
});
//获取ssession中的用户名
router.get('/getSessionName', function(req,res,next){
        // console.log("/getSessionName");
        if(req.session.username){
             res.json(({success:true, name:req.session.username, userId: req.session.userId}));
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