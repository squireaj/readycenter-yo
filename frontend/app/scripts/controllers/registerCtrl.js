angular.module('readyCenter').controller('SignupCtrl', function($scope, UsersService) {

	$scope.login = function() {
		if ($scope.password !== $scope.password2) {
			$scope.error = "Please make sure your passwords match. :)";
			return;
		}
		UsersService.signup($scope.email, $scope.password).then(function(new_user) {
			console.log('success', 'Ok!', 'You are now registered');
			Materialize.toast("Account Created!", 2500, 'toast-success');
				$('#modal1').closeModal();
			 
			  $scope.reg_email = '';
			  $scope.reg_password = '';
			  $scope.password_confirm = '';
		}).catch(function(err) {
			$scope.error = err.message;
			
		});
	};
});