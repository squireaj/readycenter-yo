'use strict';

angular.module('readyCenter')
  .controller('DashboardCtrl', function ($scope, $http, API_URL, alert, $q, dashboardService, limitToFilter) {


  // $scope.getLocation = function(val) {
  //   return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
  //     params: {
  //       address: val,
  //       sensor: false
  //     }
  //   }).then(function(response){
  //     return response.data.results.map(function(item){
  //       return item.formatted_address;
  //     });
  //   });
  // };


  // $scope.getLocation = function(val) {
  //   return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
  //     params: {
  //       address: val,
  //       sensor: false
  //     }
  //   }).then(function(response){
  //     return response.data.results.map(function(item){
  //       return item.formatted_address;
  //     });
  //   });
  // };

    $scope.search = function(searchInput) {
    return $http({
    	method: 'GET',
    	url: "https://api.nutritionix.com/v1_1/search/" + searchInput + "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=e75dbd7f&appKey=553d2e83269de00703d6c09ef2ac93d1"}).then(function(response){
    		console.log('dashboardctrl', response);
      return limitToFilter(response.data.hits, 15);
    });
  };

  // this.apiTest = function(){
  // 		console.log('fired');
  // 		var deferred = $q.defer();
  // 	 	$http({
  // 			method: 'GET',
  // 			url: "https://api.nutritionix.com/v1_1/search/apple?results=0%3A20&cal_min=0&cal_max=50000&fields=nf_calories%2Cnf_total_carbohydrate&appId=e75dbd7f&appKey=553d2e83269de00703d6c09ef2ac93d1"
  // 		}).then(function(data){
  // 			console.log(data);
  // 			deferred.resolve(data);
  // 		})	
  // 		return deferred.promise;
  // 	} 

  	$scope.apiTest = function(){

  		return dashboardService.apiTest()

   	} 

  	$scope.time = '6:03';

  });

	
	// $scope.apiTest = function(){
 //  		console.log('fired');
 //  		var deferred = $q.defer();
 //  	return $http({
 //  			method: 'GET',
 //  			url:'http://api.nal.usda.gov/usda/ndb/reports/?name=eggs&type=b&format=fjson&api_key=W5rrjCUIpsnfogS7cmJR6vyawAHtc1vVCoEJkb7V'
 //  		}).then(function(data){
 //  			console.log(data);
 //  			deferred.resolve(data);
 //  		})	
 //  		return deferred.promise;
 //  	} 
 //  });




//Restricted access code
  	 // $http.get(API_URL + 'dashboard').success(function(dashboard){

  	 // }).error(function(err){
  	 // 	alert('warning', "Unable to get dashboard", err.message); 
  	 // })