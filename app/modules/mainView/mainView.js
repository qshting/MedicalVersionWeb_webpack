/**
 * Created by dell on 2017/8/11.
 */
import angular from 'angular';


var myApp_mainView = angular.module('myApp.mainView', [
])
    .controller('mainViewController', ['$scope','$sessionStorage','$timeout','$location',function($scope,$sessionStorage,$timeout,$location) {
		
		
		$scope.account = $sessionStorage.account;	
		if($scope.account == null || $scope.account == ''){
			$location.path('login');
		}
        //页面跳转及tab导航切换
        var categoryPaths = {
            softwareSetting: './src/view_controllers/softwareSetting/softwareSetting.html',
            versionsSetting: './src/view_controllers/versionsSetting/versionsSetting.html',
            download: './src/view_controllers/download/download.html'
        };
        $scope.categoryPath = categoryPaths.softwareSetting;

        $scope.switchPath = function (path) {
            $scope.categoryPath = categoryPaths[path];
            $scope.navTab = path;
        }

		$scope.export=function(){
			$sessionStorage.account = null;
			$sessionStorage.token = null;
			$location.path('login');
		}

    }]);
	
module.exports = myApp_mainView.name;