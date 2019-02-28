'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
/*  'myApp.view2',*/
  'login',
  /*'registrations',*/
  'dashboard',
  'con_log',
 /* 'alarms',
  'client',*/
  'machine_reg',
  /*'Maintanances',*/ 
  'ngPercentDisplay',
  'machines',
  'report',
  /*'export',*/
  /*'role',
  'jobpage',
  'job',*/
  'moment-picker',
  'shift',
  /*'breaktime',*/
  'operator',
  /*'operation',
  'comp',*/
  'machine_allocation',
  'operator_master',
  'operator_allocation_master',
  /*'rolesetting',*/
  'user',
  'highcharts-ng',
  /*'alldetails',*/
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

 $routeProvider.otherwise({redirectTo: '/login'});
}])


// run function for session handing

.run(function($rootScope,$location) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        // handle route changes  
   $rootScope.currentPath = $location.path();
   $rootScope.curPath=$rootScope.currentPath.substring(1);
    $rootScope.clock=localStorage.getItem("loginDate");
        //console.log($rootScope.currentPath)
        //time intervel for dash
        if (typeof $rootScope.stop == 'function') {
            if ($rootScope.currentPath != "/dashboard") {
                $rootScope.stop();
            }
        }
//dash end

        if(localStorage.getItem("userdata") ==null){
   $location.path('/login')
    return;
 }
 //localStorage.setItem('userdata'
    });
})

//-------------------

.controller('appctrl', ['$scope', '$http','$location','$rootScope','$window','$interval',
  function($scope, $http,$location,$rootScope,$window,$interval) {

   var tick = function() {
    $rootScope.clock = Date.now();
  }
  tick();
  //$interval(tick, 1000);
    
    $scope.currentPath = $location.path();
//$rootScope.api_url='http://13.127.251.48:81/api/v1/';
//$rootScope.api_url='http://13.127.251.48:3000/api/v1/';
//$rootScope.api_url='http://13.233.191.144:81/api/v1/';
$rootScope.api_url='http://192.168.1.48:3001/api/v1/';

//$rootScope.api_url='http://183.82.250.137:4003/api/v1/';

  $rootScope.EMERALD="EMERALD";

 $scope.signout = function(){  
 // alert("hi");
localStorage.clear();
//alert("Logout Successfully")
 $window.location="/#!/login"
  }

$scope.pageverification=function(url){
  var urls=url.substring(3);
$location.path(urls);



}




}])

.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick;// || "Are you sure?";
                   var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]);



