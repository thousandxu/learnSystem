'use strict';
/**
 * @Author    thousand
 * constant
 */
angular.module('BlankApp')
.service('constantService', function() {
	var courseMenu = {
		course1: false,
		course2: false,
		course3: false,
		course4: false,
		course5: false,
		course6: false
	};
      //bbs下各详情页的面包屑导航名字 
	var getSubName = function(href) {
		var temp = href.lastIndexOf('/') + 1;
             var substr = href.substring(temp);
             switch(substr) {
                 	case "resources":
                 	   return "资源区";
                 	   break;
                 	case "books":
                 	   return "图书区";
                 	   break;
                    case "detail":
                        return "详情";
                        break;
             }
	}
	//图书资源的目录的导航
	var categoryList = ["全部", "CSS", "HTML", "JavaScript"];

	return{
		courseMenu: courseMenu,
		categoryList: categoryList,
		getSubName: getSubName
	}
});