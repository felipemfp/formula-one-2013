(function() {
  'use strict';

  angular
    .module('helloAngular')
    .controller('DriverController', DriverController);

  /** @ngInject */
  function DriverController($routeParams, ergastAPI) {
    var vm = this;

    vm.id = $routeParams.id;
    vm.races = [];
    vm.driver = null;

    ergastAPI.getDriverDetails(vm.id).then(function(fetchedData) {
      vm.driver = fetchedData;
    });

    ergastAPI.getDriverRaces(vm.id).then(function(fetchedData) {
      vm.races = fetchedData;
    });
  }
})();
