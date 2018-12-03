/**
 * Created by dell on 2017/8/10.
 */
import angular from 'angular';


var myApp_mainView_download = angular.module('myApp.mainView.download', [])
    .controller('downloadController', ['$scope','$filter','$http','$location','apiConfig','$sessionStorage',function($scope,$filter,$http,$location,apiConfig,$sessionStorage) {
			var token  = $sessionStorage.token;
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "getsoftversionlist",
				data: {
					//requestSoftName:$scope.paramSoftName,
					//requestPackageName:$scope.paramPackageName,
					//requestVersionNum:$scope.paramVersionNum
					//requestPublishStatus:1,//发布状态  1：未发布 2：发布
					//requestTerminalType://终端类型：如IOS,
					isIosFlg:1,
					token:token
				},
				method:'POST'
				})
                .then(function successCallback(response) {
					if(response.data.code == 0){
						$scope.dataVersion=response.data.data.softVersionList;
						$scope.totalSize=response.data.data.totalSize;

						//搜索模块
						$scope.currentSoftversion = $scope.dataVersion;
						// 分页
						$scope.currentSoftversion = [];
						$scope.page = 1;        //默认第1页
						$scope.maxSize = 3;    //每页显示几个数字
						$scope.itemsPerPage = 20;    //每一页显示10条数据
						$scope.totalItems = $scope.totalSize;    //总的条数

						getCurrentPageSoft();

						// 返回当前页对应的数据
						function getCurrentPageSoft() {
							var start = ($scope.page - 1) * $scope.itemsPerPage;
							$scope.currentSoftversion = $scope.dataVersion.slice(start, start + $scope.itemsPerPage);
						}

						// 切换分页
						$scope.changePage = function() {
							getCurrentPageSoft();
						}
					}
					else if(data.code == -907){
						$location.path('login');
					}
					else{
						alert(response.data.msg)
					}
				}, function errorCallback(response) {
                // 请求失败执行代码
                alert("请求失败");
           		 });
				
				$scope.btnSearchgoto=function(){
					var filterParams = {};
					if($scope.searchName) {
						filterParams.softName = $scope.searchName;
					}
					if($scope.searchPackageName) {
						filterParams.packageName = $scope.searchPackageName;
					}
					if($scope.searchVersionNum) {
						filterParams.versionNum = $scope.searchVersionNum;
					}
					$scope.currentSoftversion = $filter('filter')($scope.dataVersion, filterParams);
				}
				
				$scope.openDownApp=function(id){
					$location.path('downAPP').search({id:id});
				}
				

    }]);
	
	module.exports = myApp_mainView_download.name;
