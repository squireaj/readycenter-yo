angular.module('readyCenter').config(function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider.

	state('home',{
		url:'/',
		templateUrl: '/views/main.html',
		contoller: 'MainCtrl'
	})
	// state('home',{
	// 	url:'/location',
	// 	templateUrl: '/views/location.html',
	// 	contoller: 'locationCtrl'
	// })
	;
});