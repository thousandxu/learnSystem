'use strict';
/**
 * @Author    thousand
 * constant
 */
angular.module('BlankApp')
.service('constantService', function() {
	var courseMenu = {
		course1: false,
		course2: false,
		course3: false,
		course4: false,
		course5: false,
		course6: false
	};


	return{
		courseMenu: courseMenu
	}
});