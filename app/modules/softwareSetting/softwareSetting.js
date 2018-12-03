/**
 * Created by dell on 2017/8/10.
 */
/**
 * Created by redcdn on 2017/2/20.
 */
import angular from 'angular';


var myApp_mainView_softwareSetting = angular.module('myApp.mainView.softwareSetting', [])
    .controller('softwareSettingController', ['$scope','$http','apiConfig','$sessionStorage','$location',function($scope,$http,apiConfig,$sessionStorage,$location) {
		var token = $sessionStorage.token;

    	$scope.searchSoft = function(){
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "getsoftlist",
				data: {requestSoftName:$scope.paramSoftName,token:token},
				method:'POST'
				}).then(function successCallback(response) {
					if(response.data.code == 0){
						$scope.dataSoftware=response.data.data.softList;
						$scope.totalSize=response.data.data.totalSize;

						// 分页
						$scope.currentSoftware = [];
						$scope.page = 1;        //默认第1页
						$scope.maxSize = 3;    //每页显示几个数字
						$scope.itemsPerPage = 20;    //每一页显示10条数据
						$scope.totalItems = $scope.totalSize;    //总的条数

						getCurrentPageSoft();

						// 返回当前页对应的数据
						function getCurrentPageSoft() {
							var start = ($scope.page - 1) * $scope.itemsPerPage;
							$scope.currentSoftware = $scope.dataSoftware.slice(start, start + $scope.itemsPerPage);
						}

						// 切换分页
						$scope.changePage = function() {
							getCurrentPageSoft();
						}
					}
					else if(response.data.code == -907){
						$location.path('login');
					}
					else{
						alert(response.data.msg)
					}
            }, function errorCallback(response) {
                alert("请求失败")
            });

        };
		$scope.searchSoft();
		
		$scope.create = function(){
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "creatsoft",
				data: {
                    token:token,
					softName:$scope.createSoftName,
					packageName:$scope.createPackageName,
					terminalType:$scope.createTerminalType,
					comment:$scope.createComment,
				},
				method:'POST'
				}).then(function successCallback(response) {
						if(response.data.code == 0){
							$('#myAddModal').modal('hide');
							$scope.searchSoft();
						}
						else if(response.data.code == -907){
							$location.path('login');
						}
						else{
							alert(response.data.msg);
						}
					}, function errorCallback(response) {
                		alert("请求失败")
            		});
        };
		
		$scope.eidtDialog = function(soft){
			$scope.editid = soft.id;
			$scope.editSoftName = soft.softName;
			$scope.editPackageName=soft.packageName;
			$scope.editTerminalType=soft.terminalType;
			$scope.editComment=soft.comment;
		}
		
		$scope.edit = function(){
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "editsoft",
				data: {
                    token:token,
					id:$scope.editid,
					softName:$scope.editSoftName,
					packageName:$scope.editPackageName,
					terminalType:$scope.editTerminalType,
					comment:$scope.editComment,
				},
				method:'POST'
				}).then(function successCallback(response) {
					if(response.data.code == 0){
						$('#myEditModal').modal('hide');
						$scope.searchSoft();
					}
					else if(response.data.code == -907){
						$location.path('login');
					}
					else{
						alert(response.data.msg);
					}
				}, function errorCallback(response) {
                alert("请求失败")
            	});
        };
		
		$scope.deleteDialog = function(id){
			$scope.editid = id;
		}
		$scope.delete = function(){
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "deletesoft",
				data: {
                    token:token,
					id:$scope.editid
				},
				method:'POST'
				}).then(function successCallback(response) {
					if(response.data.code == 0){
						$('#deleteModal').modal('hide');
						$scope.searchSoft();
					}
					else if(response.data.code == -907){
						$location.path('login');
					}
					else{
						alert(data.msg);
					}
				}, function errorCallback(response) {
                    alert("请求失败")
                 });
        };

    }]);
	
	
module.exports = myApp_mainView_softwareSetting.name;
