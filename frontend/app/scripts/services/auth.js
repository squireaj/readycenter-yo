'use strict';

angular.module('readyCenter').service('auth', function auth($http, API_URL, authToken) {
		this.login = function(email, password){
			return $http.post(API_URL + 'api/users', {email:email, password:password}).success(function(res){
				authToken.setToken(res.token);
			})
		}

		this.register = function(email, password) {
		return $http.post(API_URL + 'register', {
			email: email, 
			password:password
		}).success(function(res){
			authToken.setToken(res.token);
		})

	}
});

