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
        return $resource('user/login');
}])
;