(function() {
  'use strict';

  angular
    .module('helloAngular')
    .controller('DriversController', DriversController);

  /** @ngInject */
  function DriversController(ergastAPI) {
    var vm = this;
    vm.loading = true;
    vm.nameFilter = '';
    vm.driversList = [];

    vm.searchFilter = function(driver) {
      var keyword = new RegExp(vm.nameFilter, 'i');
      return !vm.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };

    ergastAPI.getDrivers().then(function(fetchedData) {
      //Dig into the responde to get the relevant data
      vm.driversList = fetchedData;
      vm.loading = false;
    });
  }
})();
