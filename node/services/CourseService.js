var sqlExcutor = require("../util/SqlExcutor");

function CourseService(){
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
       this.insertUserCourse = function(userId, courseId, type, chapterId, finish, callback) {
              var option = [userId, courseId, type, chapterId, finish];
              var sql = "insert into userCourse(userId, courseId, type, chapterId, finish) values(?,?,?,?,?)";
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
       //用户学习记录
       this.insertLearnRecord = function(userId, courseId, type, chapterId, time, callback) {

       }



}

module.exports = CourseService;
