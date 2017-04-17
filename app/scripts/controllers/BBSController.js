'use strict';

angular.module('BlankApp')
//bbsIndex页面的Controller
.controller('BBSIndexCtrl', ['$rootScope', '$scope', '$http',
      function($rootScope, $scope, $http){
      

}])
//插件资源resources的Controller
.controller('ResourcesIndexCtrl', ['$rootScope', '$scope', '$location', 'constantService', 'allResources',
      function($rootScope, $scope, $location, constantService, allResources){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);
      var init = function() {
            allResources.get({}, function(resp) {
                 console.log("插件资源", resp.data);
                 $scope.resourcesList = resp.data;
            });
      }
      init();
}])
//图书资源的Controller
.controller('BooksIndexCtrl', ['$rootScope', '$scope', 'constantService','allBooks',
      function($rootScope, $scope, constantService, allBooks){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);
      $scope.categoryList = constantService.categoryList;
      $scope.nowCategory = $scope.categoryList[0].name;
      var init = function() {
            allBooks.get({}, function(resp) {
                  console.log("图书资源", resp.data);
            })
      }
      init();
      $(".books-warp .book-warp").hover(function(){
            $(this).find(".txt").stop().animate({height:"198px"},400);
            $(this).find(".txt h3").stop().animate({paddingTop:"60px"},400);
      },function(){
            $(this).find(".txt").stop().animate({height:"45px"},400);
            $(this).find(".txt h3").stop().animate({paddingTop:"0px"},400);
      })

      $scope.bookDownload = function() {
            console.info("下载书籍");
      }
}])