'use strict';

/* menuController */

// var app = angular.module('BlankApp', []);
angular.module('BlankApp')
.controller('TopMenuCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog','sessionStore','logoutStore', 'managerStore',
      function($rootScope, $scope, $http,$location, eventbus, $mdDialog, sessionStore, logoutStore, managerStore){
        $scope.ifUserLogin = false;
        $scope.ifManagerLogin = false;
        var init = function(){
              sessionStore.get({},function(response){
                     // console.info(response);
                     if (response.success) {
                         $scope.username = response.name;
                         $scope.ifUserLogin = true;
                     } else {
                         $scope.ifUserLogin = false;
                     }
              });
              managerStore.managerSession().get({}, function(resp) {
                     if (resp.success) {
                         $scope.managerName = resp.name;
                         $scope.ifManagerLogin = true;
                     } else {
                         $scope.ifManagerLogin = false;
                     }
              });
        }
        init();
        $scope.showUser = true;
        // 监控路由地址变化,根据路由地址判断是否显示tag filter按钮
        $rootScope.$on('$locationChangeSuccess',function (event,url) {
                var temp = url.lastIndexOf('/') + 1;
                var subUrl = url.substring(temp);
                if (subUrl === "managerLogin") {
                      $scope.showUser = false;
                } else {
                      $scope.showUser = true;
                }
        });
        //显示用户登录界面
        $scope.showLogin = function(ev){
        	 $mdDialog.show({
        	    controller: 'UserLoginCtrl',
        	    templateUrl: 'views/dialog/userLogin.html',
        	    parent: angular.element(document.body),
        	    targetEvent: ev,
        	    escapeToClose: false,
        	 });
        }
        //显示用户注册界面
       $scope.showRegister = function(ev){
          	 $mdDialog.show({
                controller: 'UserRegisterCtrl',
                templateUrl: 'views/dialog/userRegister.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                escapeToClose: false,
             });
        }
        // 点击修改密码事件
        $scope.revisepsd = function(ev) {
              $mdDialog.show({
                controller: 'RevisePsdCtrl',
                templateUrl: 'views/dialog/userChangePsd.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                escapeToClose: false,
             });
        }
        // 用户登出
        $scope.logout = function() {
             logoutStore.get({}, function(resp) {
                    if (resp.success) {
                          $scope.ifLogin = false;
                    }
             })
        }

        eventbus.onMsg("login_success",function(v,m){
              $scope.username = m;
              $scope.ifLogin = true;
        },$scope);
}])
//用户登录模块
.controller('UserLoginCtrl', ['$rootScope', '$scope', '$http','$location','eventbus','$mdDialog','userLoginStore',
       function($rootScope, $scope, $http,$location, eventbus, $mdDialog, userLoginStore){
       
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
              userLoginStore.login({
                    username: $scope.username,
                    password: $scope.password
              },function(response){
                    console.info(response);
                    if(response.success) {
                            eventbus.emitMsg("login_success",$scope.username);
                            $mdDialog.cancel();
                    }
              })
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
                  if (data.success) {
                     eventbus.emitMsg("message",data.data)
                     $mdDialog.cancel();
                  } else {
                     $scope.registerFailed = true;
                  }
             });
       }
}])
//修改密码
.controller('RevisePsdCtrl',['$scope','$mdDialog','revisePsdStore', function($scope, $mdDialog,revisePsdStore) {
       $scope.close = function(){
          $mdDialog.cancel();
       }
}])
//mdToast 的公共事件
.controller('WarnCtrl', ['$scope', '$mdToast', 'eventbus', function($scope, $mdToast, eventbus) {
       eventbus.onMsg('message', function(event, text) {
              $mdToast.show(
                    $mdToast.simple()
                    .content(text)
                    .position('top right')
                    .action('OK')
                    .hideDelay(1000)
                    //.parent(angular.element(document).find('.maincontent'))
              );
       });
}])
