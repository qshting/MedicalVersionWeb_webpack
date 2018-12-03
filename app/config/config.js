import angular from 'angular';

import routerConfig from './router';
import host from './host/host';

var config = angular.module('config',[])
    .config(routerConfig)
    .constant('apiConfig',host);


module.exports = config.name;