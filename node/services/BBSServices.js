var sqlExcutor = require("../util/SqlExcutor");

function BbsService() {
       //获取所有的插件资源信息
       this.selectAllResources = function(callback) {
              // var option = [userId];
              var sql = "select resources.*, users.username from resources, users where resources.ownerId=? and users.id";
              sqlExcutor.excute(sql, callback);
       }
       //获取选定用户喜爱的插件资源
       this.selectUserFavoriteResources = function(userId, callback) {
              var option = [userId];
              var sql = "select * from resources, userResources where resources.id = userResources.resourceId and userResources.userId=?";
              sqlExcutor.excute(sql, option, callback);
       }
       // 获取用户发布的插件资源
       this.selectUserResources = function(userId, callback) {
              var option = [userId];
              var sql = "select * from resources where ownerId=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //更新插件资源浏览量
       this.updateViewCount = function(viewCount, id, callback) {
              var option = [viewCount, id];
              var sql = "update from resources set viewCount=? where id=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //更新插件收藏量
       this.updateFavoriteCount = function(favoriteCount, id, callback) {
              var option = [favoriteCount, id];
              var sql = "update from resources set favoriteCount=? where id=?";
              sqlExcutor.excute(sql, option, callback);
       }
       //收藏插件,插入用户插件资源关系表
       this.insertUserResource = function(resourceId, userId, callback) {
              var option = [resourceId, userId];
              var sql = "insert into userResources(resourceId, userId) values(?,?)";
              sqlExcutor.excute(sql, option, callback);
       }
       //取消插件收藏,删除记录
       this.deleteUserResource = function(resourceId, userId, callback) {
              var option = [resourceId, userId];
              var sql = "delete from userResources where resourceId=?, userId=?";
              sqlExcutor.excute(sql, option, callback);
       }

       // 查询所有图书资源
       this.selectAllBook = function(callback) {
              var sql = "select * from books";
              sqlExcutor.excute(sql, callback);
       }


}

module.exports = BbsService;
