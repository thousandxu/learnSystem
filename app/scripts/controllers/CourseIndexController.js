'use strict';

angular.module('BlankApp')
//默认首页课程的Controller
.controller('CourseIndexCtrl', ['$rootScope', '$scope', '$http','$location',"constantService",
      function($rootScope, $scope, $http,$location, constantService){
      $scope.courseMenu = constantService.courseMenu;
      $scope.showChapter = function(event){
             for (var i in $scope.courseMenu) {
            	     $scope.courseMenu[i] = false;
             }
             $scope.courseMenu[event.target.className] = true;
      }
      $scope.hideChapter = function(){
      	for (var i in $scope.courseMenu) {
            	     $scope.courseMenu[i] = false;
             }
      }

}])
//点击总览选择课程查看的课程页面Controller
.controller('CourseCenterCtrl', ['$rootScope', '$scope', '$http','$location',"constantService",
      function($rootScope, $scope, $http,$location, constantService){

            
}])
//点击查看单个课程章节的Controller
.controller('CourseDetailCtrl', ['$rootScope', '$scope', '$http','$location','$stateParams','getCourse','getChapters','courseSession',
      function($rootScope, $scope, $http,$location, $stateParams,getCourse,getChapters,courseSession){
      console.log('courseId', $stateParams.courseId);
      var initData = function() {
            getCourse.get({
                 courseId: $scope.courseId
            }, function(resp) {
                 console.log(resp);
                 $scope.nowCourse = resp.data;
            });
            $scope.videoChapter = [];
            $scope.wordChapter = [];
            getChapters.get({
                courseId: $scope.courseId
            }, function(resp) {
                console.log(resp);
                var result = resp.data;
                _.forEach(result, function(data) {
                      if (data.type === 1) {
                           $scope.videoChapter.push(data);
                      }
                });
            });
      }
      var init = function() {
            if ($stateParams.courseId) {
                    $scope.courseId = $stateParams.courseId;
                    initData();
            } else {
                    courseSession.get({}, function(resp) {
                         $scope.courseId = resp.courseId;
                         initData();
                    });
            }
      }
      init();
            
}])