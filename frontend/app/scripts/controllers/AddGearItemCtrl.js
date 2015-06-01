'use strict';

angular.module('readyCenter')
  .controller('AddGearItemCtrl', function ($scope, $http, API_URL, alert ) {

    $scope.create = function() {
      Materialize.toast("Item Created!", 2500, 'toast-success');
    }

  });