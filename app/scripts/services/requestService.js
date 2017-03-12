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
.service('revisePsdStore', ['$resource', function($resource) {
        return $resource('user/revisepsd',{},{
             save: {
                    method: "POST"
              } 
        });
}])
.service('sessionStore', ['$resource', function($resource) {
        return $resource('user/getSessionName');
}])
.service('logoutStore', ['$resource', function($resource) {
        return $resource('user/logout');
}])
;