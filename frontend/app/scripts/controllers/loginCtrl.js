angular.module('readyCenter').controller('LoginCtrl', function($scope, $location, UsersService) {

	$scope.clickLogin = function() {
		UsersService.login($scope.email, $scope.password).then(function() {
			$location.path('/dashboard');
			console.log('success', 'Ok!', 'You are now registered');
			Materialize.toast("You are now loged in!", 2500, 'toast-success');
				$('#modal1').closeModal();
				$scope.email = '';
				$scope.password = '';
		}).catch(function(err) {
			$scope.error = err;
			console.log('warning', 'Opps!', 'Could not login');
			Materialize.toast("Incorrect Username/Password!", 2500, 'toast-warning');
			$scope.password = '';
		});;
	};
});