'use strict';

/* menuController */

// var app = angular.module('BlankApp', []);
angular.module('BlankApp')
.controller('TopMenuCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
      function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
      //显示用户登录界面
      $scope.showLogin = function(ev){
	 $mdDialog.show({
	    controller: 'UserLoginCtrl',
	    templateUrl: 'views/userLogin.html',
	    parent: angular.element(document.body),
	    targetEvent: ev,
	    escapeToClose: false,
	 });
      }
      //显示用户注册界面
      $scope.showRegister = function(ev){
	 $mdDialog.show({
	    controller: 'UserRegisterCtrl',
	    templateUrl: 'views/userRegister.html',
	    parent: angular.element(document.body),
	    targetEvent: ev,
	    escapeToClose: false,
	 });
      }
}])
//用户登录模块
.controller('UserLoginCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
      function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
      
      $scope.closeFunction = function(){
      	$mdDialog.cancel();
      }
}])
//用户注册模块
.controller('UserRegisterCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
      function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
      
      $scope.closeFunction = function(){
      	$mdDialog.cancel();
      }
}])