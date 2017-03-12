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
	this.updateUsre = function(id, username, address, birth, university, portrait, callback) {
		var option = [id, username, address, birth, university, portrait];
		var sql = "";
		sqlExcutor.excute(sql, option, callback);
	}



}

module.exports=UserService;
