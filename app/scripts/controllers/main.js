'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('readyCenter')
  .controller('MainCtrl', function ($scope) {
  	$scope.newReg = false;
	$scope.showReg = function(){
	$scope.newReg = !$scope.newReg;
		console.log("Ran newReg")
	}
  });
