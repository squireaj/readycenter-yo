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
	});

	$httpProvider.interceptors.push('authInterceptor')
})

.constant('API_URL', 'http://localhost:3000/');