'use strict';

angular.module('BlankApp')
.controller('UserInfoIndexCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        
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
       }, {
              view: '.notes',
              icon: 'fa-signal',
              name: '学习笔记'
       }];
       $scope.nowCall = $scope.userManageList[0].name;

       $scope.manageClick = function(option) {
              $scope.nowCall = option.name
       }

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
             }
       }
       initNav();

}])
//用户信息设置 
.controller('UserSettingCtrl', ['$rootScope', '$scope', '$http','eventbus','$mdDialog','getUserInfo','updateUserInfo',
       function($rootScope, $scope, $http, eventbus, $mdDialog, getUserInfo, updateUserInfo){
        var init = function() {
              getUserInfo.get({}, function(resp) {
                     console.log(resp);
                     $scope.nowUser = resp.data[0];
              });
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