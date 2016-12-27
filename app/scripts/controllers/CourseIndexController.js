'use strict';

angular.module('BlankApp')
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
