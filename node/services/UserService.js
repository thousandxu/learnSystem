var sqlExcutor = require("../util/SqlExcutor");

function UserService(){
              //用户注册
	this.createUser = function(username, password, email, mobile, create_time, intorduce, callback){
		var option = [username, password, email, mobile, create_time, intorduce];
		var sql = "insert into users(username, password, email, mobile, create_time, intorduce) values(?,?,?,?,?,?)";
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
	// 保存用户头像路径
	this.saveUserPortrait = function(userId, path, callback) {
		var option = [path, userId];
		var sql = "update users set portrait=? where id=?";
		sqlExcutor.excute(sql,option,callback);
	}
	this.getUserPortrait = function(userId, callback) {
		var option = [userId];
		var sql = "select portrait from users where id=?";
		sqlExcutor.excute(sql,option,callback);
	}
	//修改用户密码
	this.setUserPsd = function(username, password, callback) {
		var option = [password, username];
		var sql = "update users set password=? where username=?";
		sqlExcutor.excute(sql, option, callback);
	}
	//更新用户信息
	this.updateUser = function(id, username, email, mobile, address, birth, university, intorduce, callback) {
		var option = [username, email, mobile, address, birth, university, intorduce, id];
		var sql = "update users set username=?,email=?,mobile=?,address=?,birth=?,university=?,intorduce=? where id=?";
		sqlExcutor.excute(sql, option, callback);
	}
	this.selectUserCourses = function(userId, callback) {
		var option = [userId];
		var sql = "select userCourse.*, course.courseName from userCourse,course where userId=? and userCourse.courseId=course.courseId";
		sqlExcutor.excute(sql, option, callback);
	}
	//查看用户学习的所有课程
	this.selectUserCourse = function(userId, callback) {
		var option = [userId];
		var sql = "select course.* from userCourse, course where userId=? and userCourse.courseId=course.courseId";
		sqlExcutor.excute(sql, option, callback);
	}
	//获取用户在某个时间范围的学习记录
	this.selectUserRecord = function(userId, callback) {
		var option = [userId];
		var sql = "select learnRecord.*, course.courseName, chapter.chapterName from learnRecord, course, chapter where learnRecord.userId=? and learnRecord.courseId = course.courseId and learnRecord.courseId = chapter.courseId and learnRecord.chapterId = chapter.chapterId";
		sqlExcutor.excute(sql, option, callback);
	}
	this.getAllUsers = function(callback) {
		var sql = "select * from users";
		sqlExcutor.excute(sql, null, callback);
	}
	// 用户交友相关操作
	// 针对用户获取相应的陌生人
	this.selectStranger = function(userId, callback) {
              // var option = [userId];
		var sql = "select * from users";
		sqlExcutor.excute(sql, null, callback);
	}
	this.insertFriend = function(userId1, userId2, status, callback) {
		var option = [userId1, userId2, status];
		var sql = "insert into friends(userId1, userId2, status) values(?,?,?)";
		sqlExcutor.excute(sql, option, callback);
	}
	this.updateFriendStatus = function(userId1, userId2, status, callback) {
		var option = [status, userId1, userId2];
		var sql = "update friends set status=? where userId1=? and userId2=?";
		sqlExcutor.excute(sql, option, callback);
	}
	this.selectFriendRequest = function(userId, callback) {
             var option = [userId];
		var sql = "select users.* from users, friends where friends.userId1=users.id and friends.status=0 and friends.userId2=?";
		sqlExcutor.excute(sql, option, callback);
	}
	this.getUserFriend1 = function(userId, callback) {
		var option = [userId];
		var sql = "select users.* from users, friends where friends.userId2=users.id and friends.status=1 and friends.userId1=?";
		sqlExcutor.excute(sql, option, callback);
	}
	this.getUserFriend2 = function(userId, callback) {
		var option = [userId];
		var sql = "select users.* from users, friends where friends.userId1=users.id and friends.status=1 and friends.userId2=?";
		sqlExcutor.excute(sql, option, callback);
	}



}

module.exports=UserService;
