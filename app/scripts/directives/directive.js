'use strict';

angular.module('BlankApp')
.directive('bookHover',[function(){
      return{
            restrict: 'A',
            link: function(scope,elem,attr) {
                   elem.bind('hover', function() {
                       
                   });
            }
      }
}])
;
