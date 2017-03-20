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
                  return res.status(500).json({"error":"服务器内部错误","success":false});
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

module.exports = router;