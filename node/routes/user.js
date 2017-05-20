var express = require('express');
var router = express.Router();
var userService=require('../services/UserService');
var userDao=new userService();
var courseService=require('../services/CourseService');
var courseDao=new courseService();
var BbsService=require('../services/BBSServices.js');
var bbsDao=new BbsService();

var success={"success":true};
var failure={"success":false};

var fs = require('fs');
var path = require('path');
var async=require('async');

/*用户注册*/
router.post('/register', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var create_time = new Date();
      var intorduce = req.body.intorduce;
	console.log("user/register:username-->%s,password-->%s,email-->%s,mobile-->%s,create_time-->%s,intorduce-->%s", username, password, email, mobile, create_time, intorduce);
       userDao.createUser(username, password, email, mobile, create_time, intorduce, function(err,result){
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
                    console.error("getUserInfo--%s",err.stack);
                    return res.status(500).json({"error":"服务器内部错误","success":false});
              }
              if (result.length > 0) {
                         res.status(200).json({"success":true,"data":result});
              } else {
                         res.status(200).json({"success":false,"error":"用户不存在"});
              }
        });
});
// 储存用户头像文件
router.get('/uploadPortrait', function(req,res,next) {
        var userId = req.session.userId;
        var imgData = req.query.imgData;
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var userImgFileName = userId + ".png";
        console.log("user/uploadPortrait: userImgFileName-->%", userImgFileName);
        console.log(__dirname);
        var imgPath = "/home/thousand/test/learnSystem/app/resources/user/";
        var finalPath = "/resources/user/" + userImgFileName;
        // console.log(path.join("/home/thousand/test/learnSystem/node/public/", userImgFileName));
        async.parallel([
               function(callback) {
                      fs.writeFile(path.join(imgPath, userImgFileName), dataBuffer, function(err) {
                             if(err){
                                    console.log(err);
                                    // res.send(err);
                             }else{
                                    // res.send({success: true, data:"保存成功！"});
                                    callback(null, null);
                             }
                      });
               },
               function(callback) {
                      async.waterfall([
                             function(ecallback) {
                                    userDao.getUserPortrait(userId, function(err, result) {
                                            ecallback(err, result)
                                    });
                             },
                             function(list, ecallback) {
                                    if (list[0].portrait) {
                                            ecallback(null, null);
                                    } else {
                                            userDao.saveUserPortrait(userId, finalPath, function(err, result) {
                                                   ecallback(err, result);
                                            });
                                    }
                             }
                      ], function(err, result) {
                             if (!err) {
                                    callback(null, null);
                             }
                      });
               }
        ], function(err, results) {
               if (err) {
                      console.log(err);
                      res.send(err);
               } else {
                      res.send({success: true, data:"保存成功！"});
               }
        })
});
router.get('/getPortrait', function(req,res,next) {
        var userId = req.session.userId;
        console.log("user/getPortrait: userId-->%", userId);
        userDao.getUserPortrait(userId, function(err, result) {
               if (err) {
                     console.error("getPortrait--%s",err.stack);
                     return res.status(500).json({"error":"服务器内部错误","success":false});
               } 
               if (result.length > 0) {
                     res.status(200).json({"success":true,"data": result});
               } else {
                     res.status(200).json({"success":false,"data": "该用户暂未设置头像"});
               }
        });
        // var userImgFileName = userId + ".png";
        // console.log("user/getPortrait: userImgFileName-->%", userImgFileName);
        // console.log(__dirname + "/public/user");
        // fs.readFile(path.join(__dirname + "/public/user", "3.png"), 'binary', function(err, data) {  
        //        if (err) {  
        //               console.log("读取用户头像失败", err);
        //               throw err;  
        //        } else {
        //               console.log("读取用户头像成功");
        //               var buffer = new Buffer(data);
        //               res.setHeader("Content-Type", "image/png");
        //               // res.status(200).json({"success":true,"data": buffer.toString()});
        //               res.send({success: true, data: buffer.toString()});
        //        }
        //         // console.log('utf-8: ', data.toString());  
        // });  
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
       var intorduce = user.intorduce;
       console.log("user/updateUserInfo:username-->%s,address-->%s,email-->%s,mobile-->%s,birth-->%s,university-->%s,intorduce-->%s", username, address, email, mobile, birth, university, intorduce);
       userDao.updateUser(userId,username,email,mobile,address,birth,university, intorduce, function(err, result) {
              if (err) {
                     console.error("updateUserInfo--%s",err.stack);
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
                  console.error("revisepsd--%s",err.stack);
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
                  console.error("getUserCourses--%s",err.stack);
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
                  console.error("getUserLearnRecord--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.length > 0) {
                  res.status(200).json({"success":true,"data":result});
             }
       });
});
// 获取用户发布的插件资源
router.get('/getUserResouces', function(req,res,next) {
        var userId = req.session.userId;
        console.log("users/getUserResouces:userId-->%s", userId);
        bbsDao.selectUserResources(userId, function(err, result) {
              if(err){
                    console.error("error--%s",err.stack);
                    return res.status(500).json({"error":"服务器内部错误","success":false});
              }
              if (result.length > 0) {
                      res.status(200).json({"success":true,"data":result});
              } else {
                      res.status(200).json({"success":false,"data":"该用户暂无发布任何资源"});
              }
        });
});


// 用户交友
router.get('/getStranger', function(req,res,next) {
       var userId = req.session.userId;
       console.log("users/getStranger:userId-->%s", userId); 
       async.waterfall([
             function(callback) {
                    userDao.selectStranger(userId, function(err, result) {
                          callback(err, result);
                    });
             },
             function(userList, callback) {
                    async.each(userList, function(item, ecallback) {
                          userDao.selectUserCourse(item.id, function(err, result1) {
                                 if (result1.length > 0) {
                                       item.course = result1;
                                 } else {
                                       item.course = [];
                                 }
                                 ecallback(null, item);
                          });
                    }, function(err) {
                          // console.log("2", JSON.stringify(userList));
                          callback(null, userList);
                    });
             }
       ], function(err, result) {
              // console.log("3", JSON.stringify(result));
              res.status(200).json({"success":true,"data":result});
       });
});
//用户请求添加好友
router.get('/requestFriends', function(req,res,next) {
       var userId1 = req.session.userId;
       var userId2 = req.query.friendId;
       var status = 0;
       console.log("users/requestFriends:userId1-->%s,userId2-->%s,status-->%s", userId1, userId2, status); 
       userDao.insertFriend(userId1, userId2, status, function(err, result) {
             if(err){
                  console.error("requestFriends--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.affectedRows > 0) {
                  res.status(200).json({"success":true,"data":result});
             }
       });
});
// 获取好友请求列表
router.get('/getFriendRequests', function(req,res,next) {
       var userId = req.session.userId;
       console.log("users/getFriendRequests:userId-->%s", userId); 
       userDao.selectFriendRequest(userId, function(err, result) {
             if(err){
                  console.error("getFriendRequests--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.length > 0) {
                  res.status(200).json({"success":true,"data":result});
             } else {
                  res.status(200).json({"success":true,"data":0});
             }
       });
});
// 同意好友请求
router.get('/accessFriend', function(req,res,next) {
       var userId2 = req.session.userId;
       var userId1 = req.query.friendId;
       var status = 1;
       console.log("users/accessFriend:userId1-->%s,userId2-->%s,status-->%s", userId1, userId2, status); 
       userDao.updateFriendStatus(userId1, userId2, status, function(err, result) {
             if(err){
                  console.error("accessFriend--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.affectedRows > 0) {
                  res.status(200).json({"success":true,"data":result});
             }
       });
});
// 获取用户的好友列表
router.get('/getUserFriends', function(req,res,next) {
       var userId = req.session.userId;
       console.log("users/getUserFriends:userId-->%s", userId); 
       async.waterfall([
             function(callback) {
                    async.parallel([
                          function(ecallback) {
                                userDao.getUserFriend1(userId, function(err, result) {
                                      ecallback(err, result);
                                });
                          },
                          function(ecallback) {
                                userDao.getUserFriend2(userId, function(err, result) {
                                      ecallback(err, result);
                                });
                          }
                    ], function(err, results) {
                          if (err) {
                              console.log("error", err.stack);
                          }
                          // console.log(JSON.stringify(results));
                          var list = [];
                          results.forEach(function(item) {
                                item.forEach(function(value) {
                                      list.push(value);
                                });
                          });
                          // console.log(JSON.stringify(list));
                          callback(null, list);
                    })
             },
             function(userList, callback) {
                    async.each(userList, function(item, ecallback) {
                          userDao.selectUserCourse(item.id, function(err, result1) {
                                 if (result1.length > 0) {
                                       item.course = result1;
                                 } else {
                                       item.course = [];
                                 }
                                 ecallback(null, item);
                          });
                    }, function(err) {
                          // console.log("2", JSON.stringify(userList));
                          callback(null, userList);
                    });
             }
       ], function(err, result) {
              res.status(200).json({"success":true,"data":result});
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