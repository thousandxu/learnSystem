angular.module('BlankApp',[
	'ngAnimate',
	'ngResource',
	'ngMaterial',
      	'ui.router',
      	'ngImgCrop',
      	'angularFileDownloader'
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
	.state('courseDetail',{
		params: {
	                    "courseId": null
	              },
		url: '/courseDetail',
		templateUrl: 'views/course/courseDetail.html',
		controller: 'CourseDetailCtrl'
	})
	.state('bbs',{
                           url: '/bbs',
		templateUrl: 'views/bbs/bbsIndex.html',
		controller: 'BBSIndexCtrl'
	})
	.state('resources',{
                           url: '/bbs/resources',
		templateUrl: 'views/bbs/resourcesIndex.html',
		controller: 'ResourcesIndexCtrl'
	})
	.state('resourcesDetail',{
		params: {
	                    "resourceId": null
	              },
                           url: '/bbs/resources/detail',
		templateUrl: 'views/bbs/resourceDetail.html',
		controller: 'ResourcesDetailCtrl'
	})
	.state('books',{
                           url: '/bbs/books',
		templateUrl: 'views/bbs/booksIndex.html',
		controller: 'BooksIndexCtrl'
	})
	// .state('games',{
              //            url: '/bbs/games',
	// 	templateUrl: 'views/bbs/gamesIndex.html',
	// 	controller: 'GamesIndexCtrl'
	// })
	.state('stranger',{
                           url: '/stranger',
		templateUrl: 'views/user/userStranger.html',
		controller: 'UserStrangersCtrl'
	})
	.state('user',{
		url: '/user',
		templateUrl: 'views/userInfo_index.html',
		controller: 'UserInfoIndexCtrl'
	})
	.state('user.friends',{
		url: '/friends',
		templateUrl: 'views/user/userFriends.html',
		controller: 'UserFriendsCtrl'
	})
	.state('user.request',{
		url: '/request',
		templateUrl: 'views/user/userRequest.html',
		controller: 'UserRequestCtrl'
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
	.state('user.resources',{
		url: '/resources',
		templateUrl: 'views/user/userResources.html',
		controller: 'UserResourcesCtrl'
	})
	.state('managerLogin', {
		url: '/managerLogin',
		templateUrl: 'views/manager/managerLogin.html',
		controller: 'managerLoginCtrl'
	})
	.state('manager', {
		url: '/manager',
		templateUrl: 'views/manager/managerIndex.html',
		controller: 'managerIndexCtrl'
	})
	.state('manager.users',{
		url: '/users',
		templateUrl: 'views/manager/managerUsers.html',
		controller: 'managerUsersCtrl'
	})
	.state('manager.course',{
		url: '/course',
		templateUrl: 'views/manager/managerCourse.html',
		controller: 'managerCourseCtrl'
	})
	.state('manager.resources',{
		url: '/resources',
		templateUrl: 'views/manager/managerResources.html',
		controller: 'managerResourcesCtrl'
	})
	.state('manager.books',{
		url: '/books',
		templateUrl: 'views/manager/managerBooks.html',
		controller: 'managerBooksCtrl'
	})

}]);
