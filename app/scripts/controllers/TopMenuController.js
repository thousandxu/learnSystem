'use strict';

/* menuController */

// var app = angular.module('BlankApp', []);
angular.module('BlankApp')
.controller('TopMenuCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog',
      function($rootScope, $scope, $http,$location, eventbus, $mdDialog){
        $scope.iflogin = false;
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

       $scope.judgeMail = function(email){
              var patt1 = new RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
              var res = patt1.test(email);
              if(!res){
                $scope.showError = true;
                $scope.errorMsg = "电子邮箱格式不正确"; 
              } 
       }

       $scope.userLogin = function(){

       }
}])
//用户注册模块
.controller('UserRegisterCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog','userRegisterStore',
      function($rootScope, $scope, $http,$location, eventbus, $mdDialog,userRegisterStore){
      
       $scope.closeFunction = function(){
        	$mdDialog.cancel();
       }

       $scope.judgeCheckPsd = function(password,checkPassword){
              if (password && checkPassword) {
                   if (password !== checkPassword) {
                     $scope.showError = true;
                     $scope.errorMsg = "两次密码输入需保持一致";
                   }
              }
      }

       $scope.judgeMail = function(email){
              var patt1 = new RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
              var res = patt1.test(email);
              if(!res){
                $scope.showError = true;
                $scope.errorMsg = "电子邮箱格式不正确"; 
              } 
      }

       $scope.userRegister = function(user){
             console.info("注册",user);
             userRegisterStore.save({
                  username: user.username,
                  password: user.password,
                  email: user.email,
                  mobile: user.mobile
             }, function(data) {
                
             });
       }
}])