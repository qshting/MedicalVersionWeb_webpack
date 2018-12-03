/**
 * Created by dell on 2017/8/11.
 */
import angular from 'angular';

var myApp_downAPP = angular.module('myApp.downAPP', [])
    .controller('downAPPController', ['$scope','$location','apiConfig','$http','$sessionStorage',function($scope,$location,apiConfig,$http,$sessionStorage) {
        var versionId = $location.search()['id'];
		$scope.qrurl=$location.absUrl();
		$http({
			url:apiConfig.apiUrl+"mvs/versionmanage/" + "getsoftversion",
			data: {id:versionId,},
			method:'POST'
			})
            .then(function successCallback(response) {
                // 请求成功执行代码

                if(response.data.code == 0){
                    $scope.plistUrl=response.data.plistUrl;
                    $scope.softName=response.data.softName;
                    $scope.versionNum=response.data.versionNum;
                    $scope.packageName=response.data.packageName;
                    $scope.upgradeContent=response.data.upgradeContent;
                }
                else{
                    alert(response.data.msg)
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
                alert("请求失败");
            });

	$scope.isWeixin=function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
		} else {
			return false;
		}
	}
	$scope.isQQ=function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/QQ/i)=="qq") {
			return true;
		} else {
			return false;
		}
	}	
	$scope.isQQBrowser=function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/QQBrowser/i)=="qqbrowser") {
			return true;
		} else {
			return false;
		}
	}	
	$scope.isMobile=function(){
		 return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}	
	
	//点击安装
	$scope.clickToStep=function(){
		
		if ($scope.isMobile()) {
		//微信或者手机QQ打开
		if ($scope.isWeixin() || ($scope.isQQ() && !$scope.isQQBrowser())) {
			alert('请点击右上角按钮，再点击在Safari中打开，即可安装！');
		} else {
			window.location.href="itms-services://?action=download-manifest&url="+$scope.plistUrl;
		}
		} else {
			alert('请在手机上打开本页面或者扫描二维码，即可安装！');
		}
	}

}]);

module.exports = myApp_downAPP.name;