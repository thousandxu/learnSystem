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
.service('uploadPortrait', ['$resource', function($resource) {
        return $resource('user/uploadPortrait');
}])
.service('getPortrait', ['$resource', function($resource) {
        return $resource('user/getPortrait');
}])
.service('getUserInfo', ['$resource', function($resource) {
        return $resource('user/getUserInfo');
}])
.service('updateUserInfo', ['$resource', function($resource) {
        return $resource('user/updateUserInfo',{},{
              save: {
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
.service('userCourses', ['$resource', function($resource) {
        return $resource('user/getUserCourses');
}])
.service('getlearnRecord', ['$resource', function($resource) {
        return $resource('user/getUserLearnRecord');
}])
//  用户交友相关请求
.service('getStranger', ['$resource', function($resource) {
        return $resource('user/getStranger');
}])
.service('requestFriends', ['$resource', function($resource) {
        return $resource('user/requestFriends');
}])
.service('getFriendRequests', ['$resource', function($resource) {
        return $resource('user/getFriendRequests');
}])
.service('accessFriend', ['$resource', function($resource) {
        return $resource('user/accessFriend');
}])
.service('getUserFriends', ['$resource', function($resource) {
        return $resource('user/getUserFriends');
}])


.service('checkUserCourse', ['$resource', function($resource) {
        return $resource('course/userCourseCheck');
}])
.service('studyCourseStore', ['$resource', function($resource) {
        return $resource('course/studyCourse');
}])
.service('updateProgress', ['$resource', function($resource) {
        return $resource('course/updateProgress');
}])
.service('learnRecord', ['$resource', function($resource) {
        return $resource('course/learnRecord');
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
// bbs
.service('allResources', ['$resource', function($resource) {
        return $resource('bbs/getAllResouces');
}])
.service('setResourceId', ['$resource', function($resource) {
        return $resource('bbs/setResourceId');
}])
.service('getResourceId', ['$resource', function($resource) {
        return $resource('bbs/getResourceId');
}])
.service('getOneResource', ['$resource', function($resource) {
        return $resource('bbs/getOneResource');
}])
.service('viewCount', ['$resource', function($resource) {
        return $resource('bbs/viewCount');
}])
.service('addFavorite', ['$resource', function($resource) {
        return $resource('bbs/addUserFavorite');
}])
.service('delFavorite', ['$resource', function($resource) {
        return $resource('bbs/delUserFavorite');
}])
.service('getUserResouces', ['$resource', function($resource) {
        return $resource('bbs/getUserResouces');
}])
.service('getReleaseResouces', ['$resource', function($resource) {
        return $resource('user/getUserResouces');
}])
.service('allBooks', ['$resource', function($resource) {
        return $resource('bbs/getAllBooks');
}])
.service('downloadBook', ['$resource', function($resource) {
        return $resource('bbs/downloadBook');
}])

.service('sessionStore', ['$resource', function($resource) {
        return $resource('user/getSessionName');
}])
.service('logoutStore', ['$resource', function($resource) {
        return $resource('user/logout');
}])
;