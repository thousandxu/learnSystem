'use strict';

angular.module('BlankApp')
.controller('UserInfoIndexCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','getFriendRequests','getUserFriends', 'getPortrait',
       function($rootScope, $scope, $http,$location, eventbus, getFriendRequests, getUserFriends, getPortrait){
        
       $scope.userManageList = [{
              view: '.setting',
              icon: 'fa-rocket',
              name: '信息设置'
       }, {
              view: '.course',
              icon: 'fa-eye',
              name: '课程进度'
       }, {
              view:'.record',
              icon:'fa-trash',
              name:'学习记录'
       }, 
       // {
       //        view: '.notes',
       //        icon: 'fa-signal',
       //        name: '学习笔记'
       // }, 
       {
              view: '.resources',
              icon: 'fa-signal',
              name: '插件资源'
       }];
       $scope.nowCall = $scope.userManageList[0].name;

       $scope.manageClick = function(option) {
              $scope.nowCall = option.name
       }

       var getHeadPortrait = function() {
              getPortrait.get({}, function(resp) {
                    console.log(resp);
                    if (resp.data[0].portrait) {
                             $scope.portraitStatus = true;
                             $scope.imgPath = resp.data[0].portrait;
                    } else {
                             $scope.portraitStatus = false;
                    }
             });
       }
       eventbus.onMsg("uploadPortrait_success", function() {
              getHeadPortrait();
       }, $scope);

       var initData = function() {
             // 已通过验证好友验证的用户好友
             getUserFriends.get({}, function(resp) {
                    $scope.friendCount = resp.data.length;
             });
             // 好友请求
             getFriendRequests.get({}, function(resp) {
                    if (resp.data.length > 0) {
                         $scope.requestCount = resp.data.length;
                    } else {
                         $scope.requestCount = 0;
                    }
                    
             });
             getHeadPortrait();
       }
       initData();

       eventbus.onMsg("friendAccess", function() {
             initData();
       }, $scope);

       var href = $location.absUrl();
       var initNav = function(){
             var temp = href.lastIndexOf('/') + 1;
             var substr = href.substring(temp);
             console.log(substr);
             switch(substr) {
                    case "setting":
                        $scope.nowCall = "信息设置";
                        break;
                    case "course":
                        $scope.nowCall = "课程进度";
                        break;
                    case "record":
                        $scope.nowCall = "学习记录";
                        break;
                    case "notes":
                        $scope.nowCall = "学习笔记";
                        break;
                    case "resources":
                        $scope.nowCall = "插件资源";
                        break;
                    default:
                        $scope.nowCall = "null";
                        break;
             }
       }
       initNav();
}])
// 处理用户交友请求
.controller('UserRequestCtrl', ['$rootScope', '$scope', 'getFriendRequests', 'accessFriend', 'eventbus',
       function($rootScope, $scope, getFriendRequests, accessFriend, eventbus){
       var initData = function() {
             getFriendRequests.get({}, function(resp) {
                    console.log(resp);
                    $scope.requestList = resp.data;
             });
       }
       $scope.access = function(idx, id) {
            accessFriend.get({
                   friendId: id
            }, function(resp) {
                   if (resp.success) {
                         $scope.requestList.splice(idx, 1);
                         eventbus.emitMsg("friendAccess");
                   }
            });
       }
       initData();
}])
// 获取用户好友列表
.controller('UserFriendsCtrl', ['$rootScope', '$scope', 'getUserFriends',
       function($rootScope, $scope, getUserFriends) {
       var initData = function() {
             getUserFriends.get({}, function(resp) {
                    console.log(resp);
                    _.forEach(resp.data, function(item) {
                          var classes = "";
                          _.forEach(item.course, function(course, index) {
                                 classes += course.courseName;
                                 if (index !== (item.course.length - 1)) {
                                       classes += ",";
                                 }
                          });
                          item.classes = classes;
                    });
                    $scope.friendList = resp.data;
             });
       }
       initData();
}])
//用户信息设置 
.controller('UserSettingCtrl', ['$rootScope', '$scope', '$http','eventbus','$mdDialog','getUserInfo','updateUserInfo', 'uploadPortrait',
      function($rootScope, $scope, $http, eventbus, $mdDialog, getUserInfo, updateUserInfo, uploadPortrait){
      var init = function() {
            getUserInfo.get({}, function(resp) {
                   console.log(resp);
                   $scope.nowUser = resp.data[0];
            });
            angular.element(".form_datetime").datepicker({format: 'yyyy-mm-dd'});
      }
      init();

      $scope.saveUser = function() {
            console.log($scope.nowUser);
            updateUserInfo.save({
                 user: $scope.nowUser
            }, function(resp) {
                 console.log(resp);
            })
      }
      $scope.myImage='';
      $scope.myCroppedImage='';

      var handleFileSelect=function(evt) {
              var file = evt.currentTarget.files[0];
              var reader = new FileReader();
              reader.onload = function (evt) {
                $scope.$apply(function($scope){
                  $scope.myImage = evt.target.result;
                });
              };
              reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

      $scope.savePortrait = function(myCroppedImage) {
             uploadPortrait.get({
                      imgData: myCroppedImage
             }, function(resp) {
                      console.log(resp);
                      if (resp.success) {
                             eventbus.emitMsg("message", resp.data);
                             console.log("保存成功！");
                             eventbus.emitMsg("uploadPortrait_success");
                      }
             })
      }
}])
//用户学习课程
.controller('UserCourseCtrl', ['$rootScope', '$scope', 'eventbus','userCourses',
       function($rootScope, $scope, eventbus, userCourses){
       var initData = function() {
             userCourses.get({}, function(resp) {
                  // console.log("用户学习的课程", resp);
                  _.forEach(resp.data, function(item) {
                      item.progress = (item.chapterId / item.courseAllChapter) * 100 + "%";
                  });
                  $scope.userCourse = resp.data;
             })
       }
       initData();
}])
//用户学习记录
.controller('UserRecordCtrl', ['$rootScope', '$scope', 'getlearnRecord',
       function($rootScope, $scope, getlearnRecord){
       var initData = function() {
             getlearnRecord.get({}, function(resp) {
                  console.log("学习Record", resp);
                  _.forEach(resp.data, function(item) {
                        item.timeStamp = moment(item.learnTime).format('YYYY-MM-DD HH:mm:ss');
                  });
                  $scope.userRecord = resp.data;
             });
       }
       initData();
}])
//用户学习笔记
.controller('UserNoteCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        
       
}])
//用户收藏插件资源的controller
.controller('UserResourcesCtrl', ['$rootScope', '$scope', 'getUserResouces', 'getReleaseResouces',
       function($rootScope, $scope, getUserResouces, getReleaseResouces){
       var init = function() {
              $scope.resourceMenu = [{
                     name: "收藏插件",
                     key: "collect"
              }, {
                     name: "发布插件",
                     key: "release"
              }];
              $scope.nowKey = $scope.resourceMenu[0].key;
              getUserResouces.get({}, function(resp) {
                     console.log(resp);
                     $scope.status = resp.success;
                     if (resp.success) {
                           $scope.resourceList = resp.data;
                     } else {
                           $scope.message = resp.data;
                     }
              });
              getReleaseResouces.get({}, function(resp) {
                     console.log(resp);
                     $scope.status2 = resp.success;
                     if (resp.success) {
                           $scope.resourceList2 = resp.data;
                     } else {
                           $scope.message2 = resp.data;
                     }
              })
       }
       init();

       $scope.change = function(item) {
              $scope.nowKey = item.key;
       }
}])
//用户交友的controller
.controller('UserStrangersCtrl', ['$rootScope', '$scope', 'eventbus', 'sessionStore', 'getStranger', 'requestFriends',
       function($rootScope, $scope, eventbus, sessionStore, getStranger, requestFriends){
       var getStrangerList = function() {
             getStranger.get({}, function(resp) {
                    console.log(resp);
                    if (resp.success) {
                          $scope.strangerList = resp.data;
                    }
                    _.forEach($scope.strangerList, function(item) {
                          item.classes = "css,html";
                    });
             });
       }
       var initData = function() {
             sessionStore.get({}, function(resp) {
                    if (resp.success) {
                          $scope.nowUserId = resp.userId;
                    }
             })
             getStrangerList();
       }
       initData();

       $scope.requestFriends = function(friendId) {
             requestFriends.get({
                   friendId: friendId
             }, function(resp) {
                   if (resp.success) {
                         eventbus.emitMsg('message', '好友请求成功');
                         getStrangerList();
                   }
             });
       }
       
}])