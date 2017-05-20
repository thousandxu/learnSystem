var sqlExcutor = require("../util/SqlExcutor");

function CourseService(){
       // 获取所有课程
       this.selectAllCourses = function(callback) {
              var sql = "select * from course";
              sqlExcutor.excute(sql, callback);
       }
       //获取课程信息
       this.selectCourse = function(courseId, callback) {
              var option = [courseId];
              var sql = "select * from course where courseId=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //获取课程章节
       this.selectChapter = function(courseId, callback){
              var option = [courseId];
              var sql = "select * from chapter where courseId=?";
              sqlExcutor.excute(sql, option, callback);
       };
       //用户学习的课程
       this.insertUserCourse = function(courseId, userId, type, chapterId, finish, callback) {
              var option = [userId, courseId, type, chapterId, finish];
              var sql = "insert into userCourse(userId, courseId, type, chapterId, finish) values(?,?,?,?,?)";
              sqlExcutor.excute(sql, option, callback);
       }
       this.checkCourse = function(courseId, userId, callback) {
              var option = [userId, courseId];
              var sql = "select * from userCourse where userId=? and courseId=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //获取用户课程学习进度
       this.selectUserCourse = function(userId, courseId, type, callback) {
              var option = [userId, courseId, type];
              var sql = "select * from userCourse where userId=? and courseId=? and type=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //更新用户课程的章节学习进度
       this.updateChapter = function(userId, courseId, type, chapterId, callback) {
              var option = [chapterId, userId, courseId, type];
              var sql = "update userCourse set chapterId=? where userId=? and courseId=? and type=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //课程学习完成标志 将finish置为1
       this.finishCourse = function(userId, courseId, type, callback) {
              var option = [userId, courseId, type];
              var sql = "update userCourse set finish=1 where userId=? and courseId=? and type=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //用户学习记录
       this.insertLearnRecord = function(userId, courseId, type, chapterId, time, callback) {
              var option = [userId, courseId, type, chapterId, time];
              var sql = "insert into learnRecord(userId, courseId, type, chapterId, learnTime) values(?,?,?,?,?)";
              sqlExcutor.excute(sql, option, callback);
       }



}

module.exports = CourseService;
