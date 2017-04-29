var express = require('express');
var router = express.Router();
var BbsService=require('../services/BBSServices.js');
var bbsDao=new BbsService();

var success={"success":true};
var failure={"success":false};

var fs = require('fs');
var async = require('async');
var _ = require('lodash');

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
                    res.status(200).json(success);
              }
        });
});
// 将要查看的resourceId保存只session中
router.get('/setResourceId', function(req, res, next) {
        var id = req.query.id;
        req.session.resourceId = req.query.id;
        console.log("session resourceId", req.session.resourceId);
        res.status(200).json(success);
});
// 提取session中的resId
router.get('/getResourceId', function(req, res, next) {
        var id = req.session.resourceId;
        res.status(200).json({success: true, resourceId: id});
});
// 查看某个插件的详情
router.get('/getOneResource', function(req, res, next) {
       var id = req.session.resourceId;
       var userId = req.session.userId;
       console.log("bbs/resources/getOneResource:resourceId-->%s, userId-->%s", id, userId);
       async.parallel([
              function(callback) {
                    bbsDao.selectResource(id, function(err, result) {
                          callback(err, result);
                    });
              },
              function(callback) {
                    bbsDao.selectUserResource(userId, function(err, result) {
                          callback(err, result);
                    });
              }
       ], function(err, results) {
              var resource = results[0];
              var favoriteList = results[1];
              _.forEach(resource, function(item) {
                     if (_.find(favoriteList, {resourceId: item.id})) {
                           item.favorite = true;
                     } else {
                           item.favorite = false;
                     }
              });
              res.status(200).json({success: true, data: resource});
       });
});
// 更新插件收藏量
router.get('/addUserFavorite', function(req,res,next) {
       var id = req.query.id;
       var userId = req.session.userId;
       var favoriteCount = req.query.favoriteCount;
       console.log("bbs/resources/addUserFavorite:resourceId-->%s,userId-->%s,favoriteCount-->%s", id, userId, favoriteCount);
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
       var userId = req.session.userId;
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
                  res.status(200).json(success);
              }
       });
});
// 获取用户收藏的插件列表
router.get('/getUserResouces', function(req,res,next) {
        var userId = req.session.userId;
        console.log("bbs/resources/getUserResouces:userId-->%s", userId);
        bbsDao.selectUserFavoriteResources(userId, function(err, result) {
              if(err){
                    console.error("error--%s",err.stack);
                    return res.status(500).json({"error":"服务器内部错误","success":false});
              }
              if (result.length > 0) {
                    res.status(200).json({"success":true,"data":result});
              } else {
                    res.status(200).json({"success":false,"data":"该用户暂无收藏插件资源"});
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