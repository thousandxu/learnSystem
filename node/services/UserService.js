var sqlExcutor = require("../util/SqlExcutor");

function UserService(){

	this.createUser = function(username, password, email, mobile, create_time, callback){
		var option = [username, password, email, mobile, create_time];
		var sql = "insert into users(username, password, email, mobile, create_time) values(?,?,?,?,?)";
		sqlExcutor.excute(sql, option, callback);
	};

	this.userLogin = function(username,password,callback) {
		var option = [username,password];
		var sql = "select * from users where username=? and password=?";
		sqlExcutor.excute(sql,option,callback);
	}


}

module.exports=UserService;
