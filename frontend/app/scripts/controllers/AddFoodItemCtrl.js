'use strict';

angular.module('readyCenter')
  .controller('AddFoodItemCtrl', function ($scope, $http, API_URL, alert ) {

  	// $scope.isResult = function(){
  	// 	if($scope.results.length > 0){
  	// 		$scope.isResult = true;
  	// 	}else {
  	// 		$scope.isResult = false;
  	// 	}
  	// };
    
    $scope.itemResults = [];
    $scope.search = function(searchInput) {
    return $http({
    	method: 'GET',
    	url: "https://api.nutritionix.com/v1_1/search/" + searchInput + "?results=0%3A30&cal_min=0&cal_max=50000&fields=item_description%2Citem_id%2Cbrand_id%2Cbrand_name%2Citem_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate&appId=e75dbd7f&appKey=553d2e83269de00703d6c09ef2ac93d1"})
    .then(function(response){
    		console.log('dashboardctrl', response.data.hits)
    		var results = response.data.hits;
    		for (var i = 0; i < results.length; i++) {
    			$scope.itemResults.push(
    			{
    				'name': results[i].fields.item_name,
    				'desc': results[i].fields.item_description,
    				'id': results[i].fields.item_id,
    				'brand': results[i].fields.brand_name
    			})
    		}
    		console.log($scope.itemResults);
    	});
  	};
  	
    $scope.create = function() {
      Materialize.toast("Item Created!", 2500, 'toast-success');
    }

	// $scope.isResult();
  });












