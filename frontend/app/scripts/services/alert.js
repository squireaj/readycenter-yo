'use strict';


angular.module('readyCenter')
  .service('alert', function alert($rootScope, $timeout) {
  	var alertTimeout;
  	return function(type, title, message, timeout){
  		console.log($rootScope);
  		$rootScope.alert = {
  			hasBeenShown: true,
  			show: true,
  			type: type,
  			message: message,
  			title: title
  		};
  		$timeout.cancel(alertTimeout);
  		alertTimeout = $timeout(function() {
  			$rootScope.alert.show = false;

  		}, timeout || 2000);
  	}
  });
