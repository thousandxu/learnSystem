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

}]);
