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
.controller('CourseDetailCtrl', ['$rootScope', '$scope', '$http','eventbus','$location','$stateParams','getCourse','getChapters','courseSession','checkUserCourse','sessionStore','studyCourseStore','$mdDialog','learnRecord','updateProgress',
      function($rootScope, $scope, $http,eventbus,$location, $stateParams,getCourse,getChapters,courseSession,checkUserCourse,sessionStore,studyCourseStore,$mdDialog,learnRecord,updateProgress){
      console.log('courseId', $stateParams.courseId);
      var initData = function() {
            $scope.chapterList = [];
            $scope.wordChapter = [];
            getCourse.get({
                 courseId: $scope.courseId
            }, function(resp) {
                 // console.log(resp);
                 $scope.nowCourse = resp.data;
            });
            checkUserCourse.get({
                 courseId: $scope.courseId,
                 type: 1
                 // userId: $scope.userId
            }, function(resp) {
                 console.log("checkUserCourse", resp);
                 $scope.hasLearn = resp.learn;
                 $scope.nowProgress = resp.data[0].chapterId;
                 getChapters.get({
                    courseId: $scope.courseId
                 }, function(resp) {
                    console.log(resp);
                    var result = resp.data;
                    _.forEach(result, function(data) {
                          if (data.type === 1) {
                               $scope.chapterList.push(data);
                          }
                    });
                    _.forEach($scope.chapterList, function(item) {
                          item.learnShow = false;
                          if (item.chapterId <= ($scope.nowProgress + 1)) {
                              item.learnShow = true;
                          }
                    });
                 });
            });
      }
      var init = function() {
            // sessionStore.get({},function(response){
            //          // console.info(response);
            //          if (response.success) {
            //              $scope.userId = response.userId;
            //              $scope.ifLogin = true;
            //          } else {
            //              $scope.ifLogin = false;
            //          }
            // });
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

      $scope.studyCourse = function() {
            studyCourseStore.get({
                  courseId: $scope.courseId
            }, function(resp) {
                   if (resp.success) {
                       $scope.hasLearn = true;
                   } else {
                       eventbus.emitMsg("warnMessage",resp.error);
                   }
            })
      }

      $scope.learnChapter = function(chapterOption, ev) {
            console.log("study");
            learnRecord.get({
                  courseId: $scope.courseId,
                  chapterId: chapterOption.chapterId,
                  type: 1
            }, function(resp) {
                  console.log("learnRecord", resp);
            })
            if (chapterOption.chapterId > $scope.nowProgress) {
                updateProgress.get({
                     courseId: $scope.courseId,
                     chapterId: chapterOption.chapterId,
                     type: 1
                }, function(resp) {
                     console.log("updateProgress", resp);
                })
            }
            $mdDialog.show({
                controller: 'CourseVedioCtrl',
                templateUrl: 'views/course/courseVedio.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                escapeToClose: false,
                locals: {
                     chapterOption: chapterOption
                }
            })
            .then(function(result) {
              
            });
      }
            
}])
.controller('CourseVedioCtrl', ['$rootScope', '$scope', '$http','$location',"$mdDialog",
      function($rootScope, $scope, $http,$location, $mdDialog){
      $scope.close = function() {
           $mdDialog.cancel();
      }
            
}])
