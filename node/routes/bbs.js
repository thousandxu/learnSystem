var express = require('express');
var router = express.Router();
var BbsService=require('../services/BBSServices.js');
var bbsDao=new BbsService();

var success={"success":true};
var failure={"success":false};

var fs = require('fs');
var async=require('async');

// bbs router
// 获取所有的插件资源信息
router.get('/getAllResouces', function(req,res,next) {
        // var username = req.session.username;
        console.log("bbs/resources/getAllResouces");
        bbsDao.selectAllResources(function(err, result) {
              if(err){
                    console.error("error--%s",err.stack);
                    return res.status(500).json({"error":"服务器内部错误","success":false});
              }
              if (result.length > 0) {
                         res.status(200).json({"success":true,"data":result});
              }
        });
});
// 更新插件浏览量
router.get('/viewCount', function(req,res,next) {
        var id = req.query.id;
        var viewCount = req.query.viewCount;
        console.log("bbs/resources/viewCount:resourceId-->%s, viewCount-->%s", id, viewCount);
        bbsDao.updateViewCount(id, viewCount, function(err, result) {
              if(err){
                    console.error("error--%s",err.stack);
                    return res.status(500).json({"error":"服务器内部错误","success":false});
              }
              if (result.affectedRows > 0) {
                         res.status(200).json({"success":true});
              }
        });
});
// 更新插件收藏量
router.get('/addUserFavorite', function(req,res,next) {
       var id = req.query.id;
       var userId = req.query.userId;
       var favoriteCount = req.query.favoriteCount;
       console.log("bbs/resources/addUserFavorite:resourceId-->%s,userId-->%s,favoriteCount-->%s", id,userId,favoriteCount);
       async.parallel([
              function(callback) {
                    bbsDao.updateFavoriteCount(id, favoriteCount, function(err, result) {
                          if(err){
                                 console.error("error--%s",err.stack);
                                 callback(err);
                          }
                          if (result.affectedRows > 0) {
                                 callback(null)
                          }
                    });
              },
              function(callback) {
                    bbsDao.insertUserResource(id, userId, function(err, result) {
                          if(err){
                                 console.error("error--%s",err.stack);
                                 callback(err);
                          }
                          if (result.affectedRows > 0) {
                                 callback(null)
                          }
                    });
              }
       ], function(error, result) {
              if (error) {
                  return res.status(500).json({"error":"服务器内部错误","success":false});
              } else {
                  res.status(200).json({"success":true});
              }
       });
});
// 用户取消收藏的插件
router.get('/delUserFavorite', function(req,res,next) {
       var id = req.query.id;
       var userId = req.query.userId;
       var favoriteCount = req.query.favoriteCount;
       console.log("bbs/resources/delUserFavorite:resourceId-->%s,userId-->%s,favoriteCount-->%s", id,userId,favoriteCount);
       async.parallel([
              function(callback) {
                    bbsDao.updateFavoriteCount(id, favoriteCount, function(err, result) {
                          if(err){
                                 console.error("error--%s",err.stack);
                                 callback(err);
                          }
                          if (result.affectedRows > 0) {
                                 callback(null)
                          }
                    });
              },
              function(callback) {
                    bbsDao.deleteUserResource(id, userId, function(err, result) {
                          if(err){
                                 console.error("error--%s",err.stack);
                                 callback(err);
                          }
                          if (result.affectedRows > 0) {
                                 callback(null)
                          }
                    });
              }
       ], function(error, result) {
              if (error) {
                  return res.status(500).json({"error":"服务器内部错误","success":false});
              } else {
                  res.status(200).json({"success":true});
              }
       });
});
// 获取所有的图书资源
router.get('/getAllBooks', function(req,res,next) {
        console.log("bbs/resources/getAllBooks");
        bbsDao.selectAllBook(function(err, result) {
              if(err){
                    console.error("error--%s",err.stack);
                    return res.status(500).json({"error":"服务器内部错误","success":false});
              }
              if (result.length > 0) {
                         res.status(200).json({"success":true,"data":result});
              }
        });
});


module.exports = router;