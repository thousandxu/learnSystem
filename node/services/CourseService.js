var sqlExcutor = require("../util/SqlExcutor");

function CourseService(){
        //h
        this.selectChapter = function(courseId, callback){
            var option = [courseId];
            var sql = "select * from chapter where courseId=?";
            sqlExcutor.excute(sql, option, callback);
        };



}

module.exports = CourseService;
