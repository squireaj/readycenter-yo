angular.module('readyCenter').service('UsersService', function($http, $q, API_URL) {
	this.signup = function(email, password) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: API_URL + 'api/users',
			data:  {
				email: email,
				password: password
			}
		}).then(function(res) {
			deferred.resolve(res.data);
		}).catch(function(res) {
			deferred.reject(res.data);
		});
		return deferred.promise;
	};

	this.login = function(email, password) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: API_URL + 'api/users/auth',
			data:  {
				email: email,
				password: password
			}
		}).then(function(res) {
			this.userId = res.data._id;
			
			deferred.resolve(res.data);
		}).catch(function(res) {
			deferred.reject(res.data);
		});
		return deferred.promise;
	};
	this.logout = function(){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: API_URL + 'api/auth/logout'
		}).then(function(res){
			deferred.resolve(res.data);
		}).catch(function(res){
			deferred.reject(res.data);
		})
		return deferred.promise;
	};
});