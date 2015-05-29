'use strict';

angular.module('readyCenter').factory('authToken', function($window) {
	var storage = $window.localStorage;
  	var cashedToken;
  	var userToken = 'userToken';
    return {
      	setToken: function(token)  {
      		cashedToken = token;
      		storage.setItem(userToken, token);
      	},
      	getToken: function() {
      		if(!cashedToken)
      			cashedToken = storage.getItem(userToken);

      		return cashedToken;
      	},
      	 isAuthenticated: function() {
      	 	return !!this.getToken();
      	 },
      	 removeToken: function(){
      	 	cashedToken = null;
      	 	storage.removeItem(userToken);
      	 	Materialize.toast("You are now loged out!", 2500, 'toast-warning');
      	 }

      }
  });

