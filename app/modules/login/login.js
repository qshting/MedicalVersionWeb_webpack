/**
 * Created by dell on 2017/8/11.
 */
import angular from 'angular';


var myApp_login = angular.module('myApp.login', [])
    .controller('loginController', ['$scope','$http','$location','$timeout','apiConfig','$sessionStorage','$state',function($scope, $http,$location,$timeout,apiConfig,$sessionStorage,$state) {

		$scope.login = function(){
            $location.path("mainView");
            if ($scope.account === '' || $scope.password === undefined) {
                $scope.showToastView('密码不能为空!');
                return;
            }
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "login",
				data: { account: $scope.account, password:$scope.password },
				method:'POST'
				}).then(function successCallback(response) {
                    // 请求成功执行代码

                    if(response.data.code == 0){
                        console.log(response.data);
                        $sessionStorage.token = response.data.data;
                        $sessionStorage.account = $scope.account;
                        $location.path("mainView");
                    }
                    else{
                        alert(response.data.msg)
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });
				
        };



            /**
             *  显示toast提示
             * @param msg
             */
            var timerToastView = null;
            $scope.hideToastView = true;
            $scope.toastViewText = "";
            $scope.showToastView = function (msg) {
                console.info("Toast显示：" + msg);
                if (timerToastView != null) {
                    $timeout.cancel(timerToastView);
                }
                $scope.hideToastView = false;
                $scope.toastViewText = msg;

                timerToastView = $timeout(function () {
                    $scope.hideToastView = true;
                    timerToastView = null;
                }, 2000);


            }

    }]);
module.exports = myApp_login.name;