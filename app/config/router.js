import angular from 'angular';

function routerConfig($urlRouterProvider, $stateProvider){

    $urlRouterProvider.when('','/login');
    $urlRouterProvider.when('/mainView','/mainView/softwareSetting');

    //route config
    $stateProvider
        .state({
            name:"myApp",
            template:"<div ui-view></div>"
        })
        .state({
            name:"myApp.login",
            url:'/login',
            templateProvider:['$q',function($q) {
                return $q(function(resolve) {
                        require.ensure([], function(require) {
                        var template = require('../modules/login/login.html');
                        resolve(template);
                    }, 'views/login');
                });
            }],
            controller:'loginController',
            resolve: {
                loadCtrl: ['$ocLazyLoad','$q', function($ocLazyLoad,$q) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                        var mod = require('../modules/login/login.js');
                        $ocLazyLoad.load({
                            name: mod
                        });

                        deferred.resolve(angular.module(mod).controller);
                    },'controllers/login');

                    return deferred.promise;
                }]
            }
        })
        .state({
            name:"myApp.downAPP",
            url:'/downAPP',
            templateProvider:['$q',function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(require) {
                        let template = require('../modules/downAPP/downAPP.html');
                        resolve(template);
                    }, 'views/downAPP');
                });
            }],
            controller:'downAPPController',
            resolve: {
                loadCtrl: ['$ocLazyLoad','$q', function($ocLazyLoad,$q) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                        var mod = require('../modules/downAPP/downAPP.js');
                        $ocLazyLoad.load({
                            name: mod
                        });

                        deferred.resolve(angular.module(mod).controller);
                    },'controllers/downAPP');

                    return deferred.promise;
                }]
            }
        })
        .state({
            name:"myApp.mainView",
            url:'/mainView',
            templateProvider:['$q',function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(require) {
                        let template = require('../modules/mainView/mainView.html');
                        resolve(template);
                    }, 'views/mainView/mainView');
                });
            }],
            controller:'mainViewController',
            resolve: {
                loadCtrl: ['$ocLazyLoad','$q', function($ocLazyLoad,$q) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                        var mod = require('../modules/mainView/mainView.js');
                        $ocLazyLoad.load({
                            name: mod
                        });

                        deferred.resolve(angular.module(mod).controller);
                    },'controllers/mainView/mainView');

                    return deferred.promise;
                }]
            }
        })
        .state({
            name:"myApp.mainView.download",
            url:'/download',
            templateProvider:['$q',function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(require) {
                        var template = require('../modules/download/download.html');
                        resolve(template);
                    }, 'views/mainView/download');
                });
            }],
            controller:'downloadController',
            resolve: {
                loadCtrl: ['$ocLazyLoad','$q', function($ocLazyLoad,$q) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                        var mod = require('../modules/download/download.js');
                        $ocLazyLoad.load({
                            name: mod
                        });

                        deferred.resolve(angular.module(mod).controller);
                    },'controllers/mainView/download');

                    return deferred.promise;
                }]
            }
        })
        .state({
            name:"myApp.mainView.softwareSetting",
            url:'/softwareSetting',
            templateProvider:['$q',function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(require) {
                        var template = require('../modules/softwareSetting/softwareSetting.html');
                        resolve(template);
                    }, 'views/mainView/softwareSetting');
                });
            }],
            controller:'softwareSettingController',
            resolve: {
                loadCtrl: ['$ocLazyLoad','$q', function($ocLazyLoad,$q) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                        var mod = require('../modules/softwareSetting/softwareSetting.js');
                        $ocLazyLoad.load({
                            name: mod
                        });

                        deferred.resolve(angular.module(mod).controller);
                    },'controllers/mainView/softwareSetting');

                    return deferred.promise;
                }]
            }
        })
        .state({
            name:"myApp.mainView.versionsSetting",
            url:'/versionSetting',
            templateProvider:['$q',function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(require) {
                        var template = require('../modules/versionsSetting/versionsSetting.html');
                        resolve(template);
                    }, 'views/mainView/versionSetting');
                });
            }],
            controller:'versionsSettingController',
            resolve: {
                loadCtrl: ['$ocLazyLoad','$q', function($ocLazyLoad,$q) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                        var mod = require('../modules/versionsSetting/versionsSetting.js');
                        $ocLazyLoad.load({
                            name: mod
                        });

                        deferred.resolve(angular.module(mod).controller);
                    },'controllers/mainView/versionsSetting');

                    return deferred.promise;
                }]
            }
        })




}

routerConfig.$inject = [
    '$urlRouterProvider',
    '$stateProvider'
];

module.exports =  routerConfig;