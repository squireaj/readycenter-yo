angular.module('readyCenter').config(function($urlRouterProvider, $stateProvider, $httpProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',{
		url:'/',
		templateUrl: '/views/main.html',
		controller: 'MainCtrl'
	})
	.state('dashboard',{
		url:'/dashboard',
		templateUrl: '/views/dashboard.html',
		controller: 'DashboardCtrl'
	})
    .state('addfooditem',{
		url:'/addFoodItem',
		templateUrl: '/views/addFoodItem.html',
		controller: 'AddFoodItemCtrl'
	})
	.state('addgearitem',{
		url:'/addGearItem',
		templateUrl: '/views/addGearItem.html',
		controller: 'AddGearItemCtrl'
	})
	.state('whattostore',{
		url:'/whatToStore',
		templateUrl: '/views/whatToStore.html',
		controller: 'WhatToStoreCtrl'
	})
	.state('addNewLocation',{
		url:'/addNewLocation',
		templateUrl: '/views/newLocation.html',
		controller: 'NewLocationCtrl'
	});

	$httpProvider.interceptors.push('authInterceptor')
})

.constant('API_URL', 'http://localhost:3000/');