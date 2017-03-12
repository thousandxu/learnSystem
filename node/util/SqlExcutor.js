var mysql=require("mysql");

var settings = {
	  acquireTimeout: 30000,
	  connectionLimit : 10,
	  host: '127.0.0.1',
	  user: 'root',
	  password: 'password',
	  // password: '@qian@1000',
	  database:'learn_system',
	  port: 3306
      };
var pool  = mysql.createPool(settings);

exports.excute = function(sql,option,callback){
	pool.getConnection(function(err,connection){
		if(err){console.log("[get mysql connection error]:"+err.stack);callback(err,null);return;}
		connection.query(sql,option,function(err,result){
			if(err){console.log("[excute mysql error]:"+err.stack);}
			connection.release();
			callback(err,result);
		});
	});
}
