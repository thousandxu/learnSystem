'use strict';

angular.module('BlankApp')
//bbsIndex页面的Controller
.controller('BBSIndexCtrl', ['$rootScope', '$scope', '$http',
      function($rootScope, $scope, $http){
      

}])
//插件资源resources的Controller
.controller('ResourcesIndexCtrl', ['$rootScope', '$scope', '$location', 'constantService',
      function($rootScope, $scope, $location, constantService){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);

}])
//图书资源的Controller
.controller('BooksIndexCtrl', ['$rootScope', '$scope', '$location', 'constantService',
      function($rootScope, $scope, $location, constantService){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);
      $scope.categoryList = constantService.categoryList;
      $scope.nowCategory = $scope.categoryList[0].name;
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