/**
 * Created by dell on 2017/8/10.
 */
/**
 * Created by redcdn on 2017/2/20.
 */
import angular from 'angular';


var myApp_mainView_versionSetting = angular.module('myApp.mainView.versionsSetting', [])
	//搜索高亮
	.filter("highlight", function($sce, $log){
		var fn = function(text, search){

			if (!search) {
				return $sce.trustAsHtml(text);
			}
			text = encodeURI(text);
			search = encodeURI(search);

			var regex = new RegExp(search, 'gi');
			var result = text.replace(regex, '<span class="highlightedText">$&</span>');
			result = decodeURI(result);
			return $sce.trustAsHtml(result);
		};

		return fn;
	})
    .controller('versionsSettingController', ['$scope','$http','$filter','apiConfig','$location','$sessionStorage',function($scope,$http,$filter,apiConfig,$location,$sessionStorage) {

    	var token = $sessionStorage.token;
	$scope.searchSoftVersion = function(){


			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "getsoftversionlist",
				data: {
					token:token
					//requestSoftName:$scope.paramSoftName,
					//requestPackageName:$scope.paramPackageName,
					//requestVersionNum:$scope.paramVersionNum
					//requestPublishStatus:1,//发布状态  1：未发布 2：发布
					//requestTerminalType://终端类型：如IOS,
				},
				method:'POST'
				}).then(function successCallback(response) {
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
					else if(response.data.code == -907){
						$location.path('login');
					}
					else{
						alert(response.data.msg)
					}
				}, function errorCallback(response) {
            		alert("请求失败")
        		});
				
			$http({
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "getsoftnames",
				data: {
                    token:token
				},
				method:'POST'
				}).then(function successCallback(response) {
					if(response.data.code == 0){
						$scope.softNames=response.data.data;
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

		$scope.searchSoftVersion();

		 $scope.upload = function (mode) {
			var fd = new FormData();
			var file;
			if(mode=="create"){
				file = document.querySelector('#fileUP').files[0];
			}
			else{
				file = document.querySelector('#efileUP').files[0];
			}
			if(file==null){
				return;
			}
			
			fd.append('versionFile', file); 
			 $http({
              method:'POST',
              url:apiConfig.apiUrl+"mvs/uploadfile",
              data: fd,
              headers: {'Content-Type':undefined},
              transformRequest: angular.identity 
               })
                 .then(function successCallback(response)
                 {
				   if(mode=="create"){
					   $scope.cDownLoadUrl = apiConfig.apiUrl+"mvs/" + response.data.data;
				   }
				   else{
                       alert(response.data.data);
					   $scope.eDownLoadUrl = apiConfig.apiUrl+"mvs/" + response.data.data;
                       $scope.getEqUrl($scope.plistUrl,$scope.eid,$scope.eDownLoadUrl);
				   }
			   }); 

            };
			
			
			$scope.create = function(){
				$http({
					url:apiConfig.apiUrl+"mvs/versionmanage/" + "creatsoftversion",
					data: {
                        token:token,
						softId:$scope.cVersionSoftName.id,
						versionNum:$scope.cVersionNum,
						publishStatus:$scope.cPublishStatus,
						forceUpgradeFlag:$scope.cForceUpgrade,
						downloadUrl:$scope.cDownLoadUrl,
						upgradeContent:$scope.cUpgradeContent,
					},
					method:'POST'
					}).then(function successCallback(response) {
						if(response.data.code == 0){
							$('#myAddModal').modal('hide');
							$scope.searchSoftVersion();
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
			
		$scope.eidtDialog = function(softVersion){
			$scope.eId=softVersion.id
			$scope.eSoftName = softVersion.softName;
			$scope.eVersionNum = softVersion.packageName;
			$scope.ePublishStatus=softVersion.publishStatus;
			$scope.eForceUpgrade=softVersion.forceUpgradeFlag;
			$scope.eDownLoadUrl=softVersion.downloadUrl;
			$scope.eUpgradeContent=softVersion.upgradeContent;
            $scope.plistUrl = softVersion.plistUrl;
            $scope.getEqUrl(softVersion.plistUrl,softVersion.id,softVersion.downloadUrl);
		}


		$scope.getEqUrl = function(plistUrl,versionId,downUrl){
            if(plistUrl != null && plistUrl!=''){
                $scope.eqrUrl=$location.absUrl().replace(/mainView/g,"downAPP") + "?id=" + versionId;
            }
            else{
                $scope.eqrUrl=downUrl;
            }
        }

		$scope.edit = function(){
				$http({
					url:apiConfig.apiUrl+"mvs/versionmanage/" + "editsoftversion",
					data: {
                        token:token,
						id:$scope.eId,
						publishStatus:$scope.ePublishStatus,
						forceUpgradeFlag:$scope.eForceUpgrade,
						downloadUrl:$scope.eDownLoadUrl,
						upgradeContent:$scope.eUpgradeContent,
					},
					method:'POST'
					}).then(function successCallback(response){
						if(response.data.code == 0){
							$('#myEditModal').modal('hide');
							$scope.searchSoftVersion();
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
				url:apiConfig.apiUrl+"mvs/versionmanage/" + "deletesoftversion",
				data: {
                    token:token,
					id:$scope.editid
				},
				method:'POST'
				}).then(function successCallback(response){
					if(response.data.code == 0){
						$('#deleteModal').modal('hide');
						$scope.searchSoftVersion();
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
		
		
		$scope.getSearchParams=function(){
			var filterParams = {};
			if($scope.paramSoftName) {
				filterParams.softName = $scope.paramSoftName;
			}
			if($scope.paramPackageName) {
				filterParams.packageName = $scope.paramPackageName;
			}
			if($scope.paramVersionNum) {
				filterParams.versionNum = $scope.paramVersionNum;
			}
			if($scope.paramTerminalType) {
				filterParams.terminalType = $scope.paramTerminalType;
			}
			if($scope.paramPublishStatus) {
				filterParams.publishStatus = $scope.paramPublishStatus;
			}
			return filterParams;
		}
		
		$scope.btnSearchgoto=function(){
			var filterParams = $scope.getSearchParams();
			$scope.currentSoftversion = $filter('filter')($scope.dataVersion, filterParams);
		}
		
		//搜索，终端类型与发布状态
		$scope.checkTab = function (hoverType,valueType) {
			$scope.paramTerminalType = valueType;
			$scope.navTab=hoverType;
			
		}
		$scope.issueTab = function (isTab,value) {
			$scope.paramPublishStatus = value;
			$scope.navPublish=isTab;
		}
    }]);
	
	
module.exports = myApp_mainView_versionSetting.name;
