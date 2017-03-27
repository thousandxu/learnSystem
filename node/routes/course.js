var express = require('express');
var router = express.Router();
var courseService=require('../services/CourseService');
var courseDao=new courseService();


var success={"success":true};
var failure={"success":false};

var async=require('async');

//获取课程信息
router.get('/getCourse', function(req, res, next) {
       var courseId = req.query.courseId;
       req.session.courseId = courseId;
       console.log("courses/getCourse:courseId-->%s", courseId);
       courseDao.selectCourse(courseId, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.length > 0) {
                  res.json({"success": true,"data": result});
             } else {
                  res.json({"success": false,"data": []});
             }
       });
});
//判断用户是否已经开始该门课程的学习
router.get('/userCourseCheck', function(req, res, next) {
       var courseId = req.query.courseId;
       var type = req.query.type;
       var userId = req.session.userId;
       console.log("courses/userCourseCheck:courseId-->%s,userId-->%s,type-->%s", courseId, userId, type);
       courseDao.selectUserCourse(userId, courseId, type, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.length > 0) {
                  res.json({"success": true,"learn": true, "data": result});
             } else {
                  res.json({"success": true,"learn": false});
             }
       });
});
router.get('/studyCourse', function(req, res, next) {
       var courseId = req.query.courseId;
       var userId = req.session.userId;
       console.log("courses/userCourseCheck:courseId-->%s,userId-->%s", courseId,userId);
       courseDao.insertUserCourse(courseId, userId, 1, 0, 0, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.affectedRows > 0) {
                  res.json({"success": true});
             } else {
                  res.json({"success": false, error:"服务器内部错误"});
             }
       });
});
//获取课程的所有章节
router.get('/getChapters', function(req, res, next) {
       var courseId = req.query.courseId;
       console.log("courses/getChapters:courseId-->%s", courseId);
       courseDao.selectChapter(courseId, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.length > 0) {
                  res.json({"success": true,"data": result});
             } else {
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
       });
});
//刷新时获取session中的courseId
router.get('/getSessionCourseId', function(req,res,next){
        // console.log("/getSessionCourseId");
        if(req.session.courseId){
             res.json(({success:true, courseId:req.session.courseId}));
        }else{
             res.json(({success:false}));
        }
});
//update course progress
router.get('/updateProgress', function(req, res, next) {
       var courseId = req.query.courseId;
       var chapterId = req.query.chapterId;
       var type = req.query.type;
       var userId = req.session.userId;
       console.log("courses/updateProgress:courseId-->%s,userId-->%s,type-->%s,chapterId-->%s", courseId, userId, type, chapterId);
       courseDao.updateChapter(userId, courseId, type, chapterId, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.affectedRows > 0) {
                  res.json({"success": true});
             } else {
                  res.json({"success": false, error:"服务器内部错误"});
             }
       });
});
//set course finish, complete learn this course
router.get('/courseFinish', function(req, res, next) {
       var courseId = req.query.courseId;
       var type = req.query.type;
       var userId = req.session.userId;
       console.log("courses/courseFinish:courseId-->%s,userId-->%s,type-->%s", courseId, userId, type);
       courseDao.finishCourse(userId, courseId, type, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.affectedRows > 0) {
                  res.json({"success": true});
             } else {
                  res.json({"success": false, error:"服务器内部错误"});
             }
       });
});
router.get('/learnRecord', function(req, res, next) {
       var courseId = req.query.courseId;
       var chapterId = req.query.chapterId;
       var type = req.query.type;
       var userId = req.session.userId;
       var time = new Date();
       console.log("courses/learnRecord:courseId-->%s,userId-->%s,type-->%s,chapterId-->%s,time-->%s", courseId, userId, type, chapterId, time);
       courseDao.insertLearnRecord(userId, courseId, type, chapterId, time, function(err,result){
             if(err){
                  console.error("register--%s",err.stack);
                  return res.status(500).json({"error":"服务器内部错误","success":false});
             }
             if(result.affectedRows > 0) {
                  res.json({"success": true});
             } else {
                  res.json({"success": false, error:"服务器内部错误"});
             }
       });
});


module.exports = router;