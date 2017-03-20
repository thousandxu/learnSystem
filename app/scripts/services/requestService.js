'use strict';
/*
 * request
 */
angular.module('BlankApp')
.service('userRegisterStore', ['$resource', function($resource) {
        return $resource('user/register', {}, {
            save: {
                method: "POST"
            }
        });
}])
.service('userLoginStore', ['$resource', function($resource) {
        return $resource('user/login',{},{
        	login: {
                    method: "POST"
              } 
        });
}])
.service('getUserInfo', ['$resource', function($resource) {
        return $resource('user/getUserInfo');
}])
.service('revisePsdStore', ['$resource', function($resource) {
        return $resource('user/revisepsd',{},{
             save: {
                    method: "POST"
              } 
        });
}])
.service('getCourse', ['$resource', function($resource) {
        return $resource('course/getCourse');
}])
.service('getChapters', ['$resource', function($resource) {
        return $resource('course/getChapters');
}])
.service('courseSession', ['$resource', function($resource) {
        return $resource('course/getSessionCourseId');
}])
.service('sessionStore', ['$resource', function($resource) {
        return $resource('user/getSessionName');
}])
.service('logoutStore', ['$resource', function($resource) {
        return $resource('user/logout');
}])
;