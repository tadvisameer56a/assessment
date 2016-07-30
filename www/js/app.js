// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngStorage','ngMessages','ngCordova','starter.services','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//=========================this is config for routing views==================================

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider
  
    .state('home', {
      url: '/home',
    templateUrl:'templates/home.html',
      
    })
      .state('photos', {
      url: '/photos',
    templateUrl:'templates/photos/photoList.html',
	 controller: 'imageController'
	
     
    })
    .state('orders', {
      url: '/orders',
      templateUrl: 'templates/orders/salesorder.html',
	   controller: 'SalesOrderCtrl'
    })
	 .state('viewOrders', {
      url: '/viewOrders/:id',
      templateUrl: 'templates/orders/detailsView.html',
	   controller: 'detailsSalesOrderCtrl'
    })


  
  
  $urlRouterProvider.otherwise('/home');
 
});
