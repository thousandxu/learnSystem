'use strict';

angular.module('BlankApp')
.controller('managerLoginCtrl', ['$rootScope', '$scope', '$location', 'managerStore', '$state',
       function($rootScope, $scope, $location, managerStore, $state){
        console.log("manager login")
        $scope.clickLogin = function() {
               managerStore.managerLogin().get({
                       name: $scope.name,
                       password: $scope.password
               }, function(resp) {
                       console.log(resp);
                       if (resp.success) {
                            $state.go('manager');
                       }
               })
        }
}])
.controller('managerIndexCtrl', ['$rootScope', '$scope', '$location', 'managerStore',
       function($rootScope, $scope, $location, managerStore){
        console.log("managerIndex");
        $scope.userManageList = [{
                view: '.users',
                icon: 'fa-users',
                name: '用户管理'
         }, {
                view: '.course',
                icon: 'fa-eye',
                name: '课程管理'
         }, {
                view:'.resources',
                icon:'fa-trash',
                name:'资源管理'
         }, {
                view: '.books',
                icon: 'fa-signal',
                name: '图书管理'
         }];
        
}])
.controller('managerUsersCtrl', ['$rootScope', '$scope', 'managerStore', 'getStranger',
       function($rootScope, $scope, managerStore, getStranger){
        var getStrangerList = function() {
             managerStore.allUser().get({}, function(resp) {
                    console.log(resp);
                    if (resp.success) {
                          $scope.usersList = resp.data;
                    }
                    _.forEach($scope.usersList, function(item) {
                          var d = new Date(item.create_time);  
                          item.create_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                          item.courseNames = "";
                          _.forEach(item.course, function(courseItem) {
                                item.courseNames += courseItem.courseName + " ";
                          });
                    });
             });
       }
       getStrangerList();
        
}])
.controller('managerCourseCtrl', ['$rootScope', '$scope', 'managerStore', '$mdDialog',
       function($rootScope, $scope, managerStore, $mdDialog){

       var init = function() { 
              $scope.showCourse = true;
              managerStore.allCourses().get({}, function(resp) {
                     $scope.courseList = resp.data;
                     _.forEach($scope.courseList, function(item) {
                            item.edit = false;
                            if (item.chapterList.length > 0) {
                                 _.forEach(item.chapterList, function(chpater) {
                                      chapter.edit = false;
                                 });
                            }
                     });
              })
       }
       init();

       $scope.edit = function(item) {
              item.edit = true;
       }

       $scope.addCourse = function() {
              $scope.courseList.push({
                   courseName: "",
                   courseInfo: "",
                   chapterList: [],
                   add: true,
                   edit: true
              })
       };

       $scope.cancel = function(item) {
             if (item.add) {
                  $scope.courseList.splice($scope.courseList.length-1, 1);
             } else {
                  item.edit = false;
             }
       }

       $scope.update = function(item) {
             if (item.add) {
                  // 新增课程
                  managerStore.addCourse().get({
                        courseName: item.courseName,
                        courseInfo: item.courseInfo
                  }, function(resp) {
                        if (resp.success) {
                             init();
                        }
                  });
             } else {
                  // 更新课程
                  managerStore.updateCourse().get({
                        courseName: item.courseName,
                        courseInfo: item.courseInfo,
                        courseId: item.courseId
                  }, function(resp) {
                        if (resp.success) {
                             init();
                        }
                  });
             }
       };

       $scope.deleteCourse = function(id, ev) {
              var confirm = $mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title('删除课程')
                    .content('你确定要删除该门课程么(删除后不可恢复)？')
                    .targetEvent(ev)
                    .ok('确定')
                    .cancel('取消');
              $mdDialog.show(confirm).then(function() {
                      managerStore.delCourse().get({
                            courseId: id
                      }, function(resp) {
                            if (resp.success) {
                                 init();
                            }
                      });
              });
       };

       $scope.showChapter = function(item) {
              $scope.showCourse = false;
              $scope.nowCourseId = item.courseId;
              $scope.nowCourseName = item.courseName;
              $scope.chapterList = item.chapterList;
       }

       $scope.returnCourse = function() {
              $scope.showCourse = true;
       }

       $scope.addChapter = function() {
              $scope.chapterList.push({
                   courseId: $scope.nowCourseId,
                   chapterId: $scope.chapterList.length + 1,
                   chapterName: "",
                   // type: 1,
                   // path: "",
                   add: true,
                   edit: true
              })
       }

       $scope.chapterCancel = function(item, idx) {
              if (item.add) {
                  $scope.chapterList.splice(idx, 1);
                  for(var i=idx; i < $scope.chapterList.length; i++) {
                        $scope.chapterList[i].chapterId = $scope.chapterList[i].chapterId - 1;
                  }
              } else {
                  item.edit = false;
              }
       }
        
}])
.controller('managerResourcesCtrl', ['$rootScope', '$scope', 'managerStore',
       function($rootScope, $scope, managerStore){
        
}])
.controller('managerBooksCtrl', ['$rootScope', '$scope', 'managerStore', 'allBooks', '$mdDialog', 'eventbus',
       function($rootScope, $scope, managerStore, allBooks, $mdDialog, eventbus){
  
       var init = function() {
            $scope.categoryList = ["全部"];
            $scope.nowCategory = $scope.categoryList[0];
            allBooks.get({}, function(resp) {
                  $scope.allBooks = resp.data;
                  _.forEach($scope.allBooks, function(item) {
                         if ($scope.categoryList.indexOf(item.category) === -1) {
                             $scope.categoryList.push(item.category);
                         }
                  })
                  $scope.bookList = _.cloneDeep(resp.data);
            });
       }
       init();

       eventbus.onMsg('addBook_success', function() {
            init();
       }, $scope);

       $scope.bookFilter = function(option) {
             $scope.nowCategory = option;
             if ($scope.nowCategory === "全部") {
                    $scope.bookList = _.cloneDeep($scope.allBooks);
             } else {
                    $scope.bookList = _.cloneDeep(_.filter($scope.allBooks, {category: $scope.nowCategory}));
             }
       }

       $scope.addBook = function(ev) {
           $mdDialog.show({
                controller: 'AddBookCtrl',
                templateUrl: 'views/dialog/addBook.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                escapeToClose: false,
           });
       }
}])
.controller('AddBookCtrl', ['$rootScope', '$scope', 'managerStore', 'allBooks', '$mdDialog','eventbus',
       function($rootScope, $scope, managerStore, allBooks, $mdDialog, eventbus){
        $scope.categoryList = ["CSS", "BootStrap", "JavaScript", "HTML", "jQuery", "AJAX"];
        $scope.nowCategory = $scope.categoryList[0];
        $scope.close = function() {
              $mdDialog.cancel();
        }

        $scope.selectCategory = function(option) {
              $scope.nowCategory = option;
        }

        $scope.$watch('ifGood', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                    if (newValue) {
                         $scope.good = 1;
                    } else {
                         $scope.good = 0;
                    }
              }
        }, false);

        $scope.saveBook = function() {
              managerStore.addBook().get({
                    category: $scope.nowCategory,
                    bookName: $scope.bookName,
                    good: $scope.good
              }, function(resp) {
                    if (resp.success) {
                         eventbus.emitMsg('addBook_success');
                         $mdDialog.cancel();
                    } else {
                         eventbus.emitMsg('message', "添加失败");
                    }
              });
        }
  

}])