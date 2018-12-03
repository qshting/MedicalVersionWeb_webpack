import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootStrap from 'angular-ui-bootstrap';
import qrcode from 'qrcode-generator';
import ngQrcode from 'angular-qrcode';
import ngStorage from 'ngstorage';
import oclazyload from 'oclazyload';

window.qrcode = qrcode;


//import modules from './modules/module';
import config from './config/config';

import '../css/bootstrap/css/bootstrap.css';
import '../css/frame.css';


var myApp = angular.module('myApp', [
    uiRouter,
    'ngStorage',
    ngQrcode,
    uiBootStrap,
    oclazyload,

    //modules,
    config
]);
myApp.constant('uibPaginationConfig', {
    itemsPerPage: 10,
    boundaryLinks: false,
    boundaryLinkNumbers: false,
    directionLinks: true,
    firstText: '首页',
    previousText: '上一页',
    nextText: '下一页',
    lastText: '尾页',
    rotate: true,
    forceEllipses: false
});


angular.element(document).ready(function(){
    angular.bootstrap(document.body, [myApp.name]);
});
