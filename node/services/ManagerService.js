var sqlExcutor = require("../util/SqlExcutor");

function ManagerService(){
        //管理员登录
        this.managerLogin = function(name, password,callback) {
               var option = [name, password];
               var sql = "select * from manager where name=? and password=?";
               sqlExcutor.excute(sql,option,callback);
        }
        // 增加新课程
        this.addCourse = function(courseName, courseInfo, courseImg, callback) {
               var option = [courseName, courseInfo, courseImg];
               var sql = "insert into course(courseName, courseInfo, courseImg) values(?,?,?)";
               sqlExcutor.excute(sql,option,callback);
        }
        this.deleteCourse = function(courseId, callback) {
               var option = [courseId];
               var sql = "delete from course where courseId=?";
               sqlExcutor.excute(sql,option,callback);
        }
        this.updateCourse = function(courseName, courseInfo, courseId, callback) {
               var option = [courseName, courseInfo, courseId];
               var sql = "update course set courseName=?, courseInfo=? where courseId=?";
               sqlExcutor.excute(sql,option,callback);
        }
        // bbs 插入新图书
        this.insertBook = function(category, bookName, good, callback) {
               var option = [category, bookName, good];
               var sql = "insert into books(category, bookName, good) values(?,?,?)";
               sqlExcutor.excute(sql,option,callback);
        }


}

module.exports = ManagerService;
