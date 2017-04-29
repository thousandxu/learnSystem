'use strict';

angular.module('BlankApp')
.directive('bookHover',[function(){
      return{
            restrict: 'A',
            link: function(scope,elem,attr) {
               // elem.bind('hover', function() {
                     $(elem).hover(function(){
                            $(this).find(".txt").stop().animate({height:"198px"},400);
                            $(this).find(".txt h3").stop().animate({paddingTop:"50px"},400);
                            $(this).find(".txt .btn").stop().animate({marginTop:"80px"},400);
                      },function(){
                            $(this).find(".txt").stop().animate({height:"45px"},400);
                            $(this).find(".txt h3").stop().animate({paddingTop:"0px"},400);
                      })
               // });
            }
      }
}])
;
