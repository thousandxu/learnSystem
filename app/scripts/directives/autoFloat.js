angular.module('nephele')
.directive('autoFloat',['$timeout',function($timeout){
    return {
      restrict:'A',
      priority:-1,
      link:function postLink(scope,iElement,iAttrs){
   //    	var t = 1;
   //    	var _loop = function(e,a){
   //    		$timeout(function(){
		 //      	if(e.children().length<=0){
		 //      		t++;
		 //      		_loop(e,a);
		 //      	}
		 //      	else{
		 //      		_rePub(e,a);
		 //      	}
			// },t*1000);
   //    	};
   //    	_loop(iElement,iAttrs);
      	var _rePub = function(){
                  var element = iElement,attrs =iAttrs;           
      		element.css({"position":"relative"}).addClass('animate_float');
      		var num = scope[iAttrs.autoFloatData].length;
      		
      		element.children().addClass('animate_float').css({"position":"absolute"});
      		var iWidth = element.children().eq(0).width();
      		var iHeight = element.children().eq(0).height();
      		var _render = function(){
      			var marginH = 20;
      			var width = element.width();
      			var row = parseInt(width/iWidth);
      			var margin = (width%iWidth)/(row-1);
      			var fm = 0;
      			if((margin*100)/iWidth > 40){
      				fm = (width%iWidth)/(2*row);
      				margin = 2*fm;
      			}

      			if(margin<60){
      				marginH = margin;
      			}

      			for(var i = 0;i<num;i++){
      				var r = i%row;
      				var l = parseInt(i/row);
      				var top = (iHeight + marginH)*l;
      				var left = fm + (iWidth +margin)*r;
      				element.children().eq(i).css({"top":top+"px","left":left+"px"});
      			}
      			var h = Math.ceil(num/row)*(iHeight+marginH) -marginH;
      			element.css({"height":h+"px"});
      		};
			_render();
			var tmo = undefined;
			$(window).resize(function(){
				$timeout.cancel(tmo);
				tmo = $timeout(_render,500);
			});


      	};
            scope.autoRender = _rePub;
            scope.$on('autoFloat.render',function(){

                  _rePub();
            });

		


      }
    }

}])

;
