'use strict';
/*
 * request
 */
angular.module('nephele')
.service('userRegisterStore', ['$resource', function($resource) {
        return $resource('user/register');
}])
.service('userLoginStore', ['$resource', function($resource) {
        return $resource('user/login');
}])