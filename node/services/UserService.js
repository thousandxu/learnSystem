var sqlExcutor = require("../util/SqlExcutor");

function UserService(){
              //用户注册
	this.createUser = function(username, password, email, mobile, create_time, callback){
		var option = [username, password, email, mobile, create_time];
		var sql = "insert into users(username, password, email, mobile, create_time) values(?,?,?,?,?)";
		sqlExcutor.excute(sql, option, callback);
	};
              //用户登录
	this.userLogin = function(username,password,callback) {
		var option = [username,password];
		var sql = "select * from users where username=? and password=?";
		sqlExcutor.excute(sql,option,callback);
	}
              //查看用户详细信息
	this.selectUser = function(username, callback) {
		var option = [username];
		var sql = "select * from users where username=?";
		sqlExcutor.excute(sql,option,callback);
	}
	//修改用户密码
	this.setUserPsd = function(username, password, callback) {
		var option = [password, username];
		var sql = "update users set password=? where username=?";
		sqlExcutor.excute(sql, option, callback);
	}
	//更新用户信息
	this.updateUser = function(id, username, email, mobile, address, birth, university, callback) {
		var option = [username, email, mobile, address, birth, university, id];
		var sql = "update users set username=?,email=?,mobile=?,address=?,birth=?,university=? where id=?";
		sqlExcutor.excute(sql, option, callback);
	}
	//查看用户学习的所有课程
	this.selectUserCourse = function(userId, callback) {
		var option = [userId];
		var sql = "select * from userCourse, course where userId=? and userCourse.courseId=course.courseId";
		sqlExcutor.excute(sql, option, callback);
	}
	//获取用户在某个时间范围的学习记录
	this.selectUserRecord = function(userId, callback) {
		var option = [userId];
		var sql = "select learnRecord.*, course.courseName, chapter.chapterName from learnRecord, course, chapter where learnRecord.userId=? and learnRecord.courseId = course.courseId and learnRecord.courseId = chapter.courseId and learnRecord.chapterId = chapter.chapterId";
		sqlExcutor.excute(sql, option, callback);
	}
	this.selectUserNote = function() {

	}
	this.selectUserFriend = function() {

	}



}

module.exports=UserService;
