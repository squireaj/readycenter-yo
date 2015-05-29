'use strict';

angular.module('readyCenter')
  .controller('MainCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL, auth) {
  	$scope.newReg = false;
  	$scope.isAuthenticated = function(){
  		return authToken.isAuthenticated(); 	
  	} 

	$scope.showReg = function(){
	$scope.newReg = !$scope.newReg;
	}

	$scope.logout = function(){
		return authToken.removeToken();
	}
//register

	$scope.submit = function() {
	auth.register($scope.reg_email, $scope.reg_password)
		.success(function(res){
			console.log('success', 'Ok!', 'You are now registered');
			Materialize.toast("Account Created!", 2500, 'toast-success');
				$('#modal1').closeModal();
			 
			  $scope.reg_email = '';
			  $scope.reg_password = '';
			  $scope.password_confirm = '';
		})
		.error(function(err){
			console.log('warning', 'Opps!', 'Could not register');
			$('#modal1').closeModal();
			Materialize.toast("Opps!, You were not registered", 2500, 'toast-warning');
		});

	};


	// Login

	$scope.submitLogIn = function() {

	auth.login($scope.email, $scope.password)
		.success(function(res){
			console.log('success', 'Ok!', 'You are now registered');
			Materialize.toast("You are now loged in!", 2500, 'toast-success');
				$('#modal1').closeModal();
				$scope.email = '';
				$scope.password = '';
		})
		.error(function(err){
			console.log('warning', 'Opps!', 'Could not login');
			Materialize.toast("Incorrect Username/Password!", 2500, 'toast-warning');
			$scope.password = '';
		}); 

	};


  });
