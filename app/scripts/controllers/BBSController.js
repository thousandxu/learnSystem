'use strict';

angular.module('BlankApp')
//bbsIndex页面的Controller
.controller('BBSIndexCtrl', ['$rootScope', '$scope', '$http',
      function($rootScope, $scope, $http){
      

}])
//插件资源resources的Controller
.controller('ResourcesIndexCtrl', ['$rootScope', '$scope', '$location', 'constantService', 'allResources', 'viewCount',
      function($rootScope, $scope, $location, constantService, allResources, viewCount){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);
      var init = function() {
            allResources.get({}, function(resp) {
                   console.log("插件资源", resp.data);
                   $scope.resourcesList = resp.data;
                  //  _.forEach($scope.resourcesList, function(item) {
                  //       item.bookImg = "/resources/resourceImg/" + item.id + ".png"
                  // });
            });
      }
      init();

      $scope.addViewCount = function(id, count) {
            var finalCount = count + 1;
            viewCount.get({
                id: id,
                viewCount: finalCount
            }, function(resp) {
                if (resp.success) {
                    console.log("更新插件viewCount成功");
                }
            });
      }
}])
// 插件资源详情的Controller
.controller('ResourcesDetailCtrl', ['$rootScope', '$scope', '$location', '$stateParams', 'constantService', 'setResourceId', 'getOneResource', 'sessionStore', 'addFavorite', 'delFavorite',
      function($rootScope, $scope, $location, $stateParams, constantService, setResourceId, getOneResource, sessionStore, addFavorite, delFavorite){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);
      var getResourceDetail = function() {
            getOneResource.get({}, function(resp) {
                console.log("插件资源",resp);
                if (resp.success) {
                     $scope.resourceDetail = resp.data[0];
                }
            });
      }
      var init = function() {
            if ($stateParams.resourceId) {
                   console.log($stateParams.resourceId);
                   setResourceId.get({
                        id: $stateParams.resourceId
                   }, function(resp) {
                        console.log(resp);
                        if (resp.success) {
                             getResourceDetail();
                        }
                   });
            } else {
                   getResourceDetail();
            }
      }
      init();

      $scope.addFavorite = function(item) {
             if (!item.favorite) {
                    item.favoriteCount = item.favoriteCount + 1;
                    addFavorite.get({
                         id: item.id,
                         favoriteCount: item.favoriteCount
                    }, function(resp) {
                          // console.log(resp);
                          if (resp.success) {
                               console.log("收藏成功");
                               item.favorite = true;
                          }
                    });
             } else {
                    item.favoriteCount = item.favoriteCount - 1;
                    delFavorite.get({
                         id: item.id,
                         favoriteCount: item.favoriteCount
                    }, function(resp) {
                          // console.log(resp);
                          if (resp.success) {
                               console.log("取消收藏成功");
                               item.favorite = false;
                          }
                    });
              
            }
      }
}])
//图书资源的Controller
.controller('BooksIndexCtrl', ['$rootScope', '$scope', '$location', 'constantService','allBooks','downloadBook',
      function($rootScope, $scope, $location, constantService, allBooks, downloadBook){
      var href = $location.absUrl();
      $scope.nowResource = constantService.getSubName(href);
      $scope.categoryList = constantService.categoryList;
      $scope.nowCategory = $scope.categoryList[0];
      var init = function() {
            allBooks.get({}, function(resp) {
                  console.log("图书资源", resp.data);
                  _.forEach(resp.data, function(item) {
                        item.bookImg = "/resources/bookImg/" + item.id + ".png";
                        item.bookHref = "/resources/book/" + item.bookName + ".pdf";
                  });
                  $scope.allBooks = resp.data;
                  $scope.bookList = _.cloneDeep(resp.data);
            });
      }
      init();

      $scope.bookFilter = function(option) {
             $scope.nowCategory = option;
             if ($scope.nowCategory === "全部") {
                    $scope.bookList = _.cloneDeep($scope.allBooks);
             } else {
                    $scope.bookList = _.cloneDeep(_.filter($scope.allBooks, {category: $scope.nowCategory}));
             }
      }

      $scope.bookDownload = function(name) {
            console.info("下载书籍");
            // downloadBook.get({
            //       bookName: name
            // }, function(resp) {
            //       console.log("下载书籍");
            // })
      }
}])