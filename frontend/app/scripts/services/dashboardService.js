'use strict';


angular.module('readyCenter').service('dashboardService', function ($q, $http) {

	// var appId = e75dbd7f;
	// var appKey = 553d2e83269de00703d6c09ef2ac93d1;
  	

	this.apiTest = function(){
  		console.log('fired');
  		var deferred = $q.defer();
  	 	$http({
  			method: 'GET',
  			url: "https://api.nutritionix.com/v1_1/search/apple?results=0%3A20&cal_min=0&cal_max=50000&fields=nf_calories%2Cnf_total_carbohydrate&appId=e75dbd7f&appKey=553d2e83269de00703d6c09ef2ac93d1"
  		}).then(function(data){
  			console.log(data);
  			deferred.resolve(data);
  		})	
  		return deferred.promise;
  	} 

  });
