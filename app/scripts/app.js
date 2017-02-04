angular.module('BlankApp',[
	'ngAnimate',
	'ngResource',
	'ngMaterial',
      	'ui.router'
])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.when("", "/index");
	$stateProvider.state('index',{
    		url: '/index',
    		templateUrl: 'views/courses_index.html',
                          controller: 'CourseIndexCtrl'
    	})
	.state('course',{
		url: '/course',
		templateUrl: 'views/courses_center.html',
		controller: 'CourseCenterCtrl'
	})
	.state('user',{
		url: '/user',
		templateUrl: 'views/userInfo_index.html',
		controller: 'UserInfoIndexCtrl'
	})
	.state('user.setting',{
		url: '/setting',
		templateUrl: 'views/user/userSetting.html',
		controller: 'UserSettingCtrl'
	})
	.state('user.course',{
		url: '/course',
		templateUrl: 'views/user/userCourse.html',
		controller: 'UserCourseCtrl'
	})
	.state('user.record',{
		url: '/record',
		templateUrl: 'views/user/userRecord.html',
		controller: 'UserRecordCtrl'
	})
	.state('user.notes',{
		url: '/notes',
		templateUrl: 'views/user/userNotes.html',
		controller: 'UserNoteCtrl'
	})
	

}]);
