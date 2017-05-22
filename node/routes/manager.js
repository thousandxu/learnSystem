var express = require('express');
var router = express.Router();
var userService=require('../services/UserService');
var userDao=new userService();
var courseService=require('../services/CourseService');
var courseDao=new courseService();
var BbsService=require('../services/BBSServices.js');
var bbsDao=new BbsService();
var ManagerService=require('../services/ManagerService.js');
var managerDao=new ManagerService();

var success={"success":true};
var failure={"success":false};

var fs = require('fs');
var path = require('path');
var async=require('async');

//管理员登录
router.get('/login', function(req,res,next) {
      var name = req.query.name;
      var password = req.query.password;
      req.session.managerName = name;
      console.log("manager/login: name-->%s, password-->%s", name, password);
      managerDao.managerLogin(name,password,function(err, result) {
          if(err){
                console.error("login--%s",err.stack);
                return res.status(500).json({"error":"服务器内部错误","success":false});
           }
           if (result.length > 0) {
                   req.session.managerId = result[0].id;
                     res.status(200).json({"success":true,"data":"登陆成功"});
           } else {
                     res.status(200).json({"success":false,"error":"用户名或密码错误"});
           }
      });
});
// 获取所有用户
router.get('/getAllUsers', function(req,res,next) {
       console.log("manager/getAllUsers");
       async.waterfall([
             function(callback) {
                    userDao.getAllUsers(function(err, result) {
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
              res.status(200).json({"success":true,"data":result});
       });
});
// 获取所有课程
router.get('/getAllCourses', function(req, res, next) {
      console.log("manager/getAllCourses");
      async.waterfall([
             function(callback) {
                    courseDao.selectAllCourses(function(err, result) {
                          callback(err, result);
                    });
             },
             function(courseList, callback) {
                    async.each(courseList, function(item, ecallback) {
                          courseDao.selectChapter(item.courseId, function(err, result) {
                                 if (result.length > 0) {
                                       item.chapterList = result;
                                 } else {
                                       item.chapterList = [];
                                 }
                                 ecallback(null, item);
                          });
                    }, function(err) {
                          // console.log("2", JSON.stringify(userList));
                          callback(null, courseList);
                    });
             }
       ], function(err, result) {
              res.status(200).json({"success":true,"data":result});
       });
})
// 增加课程
router.get('/addCourse', function(req,res,next) {
       var courseName = req.query.courseName;
       var courseInfo = req.query.courseInfo;
       // var img = req.query.img;
       var courseImg = "/resources/course/" + courseName + ".jpg";
       console.log("manager/addCourse: courseName-->%s,courseInfo-->%s,courseImg-->%s", courseName, courseInfo, courseImg);
       managerDao.addCourse(courseName, courseInfo, courseImg, function(err, result) {
             if(err){
                 console.error("addCourse--%s",err.stack);
                 return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.affectedRows > 0) {
                 res.status(200).json(success);
              } else {
                 res.status(200).json(failure);
              }
       })
});
// 删除课程
router.get('/delCourse', function(req,res,next) {
       var courseId = req.query.courseId;
       console.log("manager/delCourse: courseId-->%s", courseId);
       managerDao.deleteCourse(courseId, function(err, result) {
             if(err){
                 console.error("delCourse--%s",err.stack);
                 return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.affectedRows > 0) {
                 res.status(200).json(success);
              } else {
                 res.status(200).json(failure);
              }
       })
});
// 更新课程
router.get('/updateCourse', function(req,res,next) {
       var courseName = req.query.courseName;
       var courseInfo = req.query.courseInfo;
       var courseId = req.query.courseId;
       console.log("manager/updateCourse: courseName-->%s,courseInfo-->%s,courseId-->%s", courseName, courseInfo, courseId);
       managerDao.updateCourse(courseName, courseInfo, courseId, function(err, result) {
             if(err){
                 console.error("addCourse--%s",err.stack);
                 return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.affectedRows > 0) {
                 res.status(200).json(success);
              } else {
                 res.status(200).json(failure);
              }
       })
});
// 新增书籍
router.get('/addBook', function(req,res,next) {
      var category = req.query.category;
      var bookName = req.query.bookName;
      var good = req.query.good;
      console.log("manager/addBook: category-->%s, bookName-->%s, good-->%s", category, bookName, good);
      managerDao.insertBook(category, bookName, good, function(err, result) {
          if(err){
                console.error("addBook--%s",err.stack);
                return res.status(500).json({"error":"服务器内部错误","success":false});
           }
           if (result.affectedRows > 0) {
                     res.status(200).json(success);
           } else {
                     res.status(200).json(failure);
           }
      });
});
// 删除课程
router.get('/deleteBook', function(req,res,next) {
       var id = req.query.id;
       console.log("manager/deleteBook: id-->%s", id);
       managerDao.deleteBook(id, function(err, result) {
             if(err){
                 console.error("deleteBook--%s",err.stack);
                 return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if (result.affectedRows > 0) {
                 res.status(200).json(success);
              } else {
                 res.status(200).json(failure);
              }
       })
});
//获取ssession中的管理员账号和管理员Id
router.get('/getManagerSession', function(req,res,next){
        // console.log("/getSessionName");
        if(req.session.managerId){
             res.json(({success:true, name: req.session.managerName, managerId: req.session.managerId}));
        }else{
             res.json(({success:false}));
        }
});



module.exports = router;
