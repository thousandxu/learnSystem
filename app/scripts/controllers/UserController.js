'use strict';

/* menuController */

// var app = angular.module('BlankApp', []);
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

}])
//用户信息设置 
.controller('UserSettingCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        
       
}])
//用户学习课程
.controller('UserCourseCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        
       
}])
//用户学习记录
.controller('UserRecordCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        
      
}])
//用户学习笔记
.controller('UserNoteCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        
       
}])