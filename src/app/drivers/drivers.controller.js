(function() {
  'use strict';

  angular
    .module('helloAngular')
    .controller('DriversController', DriversController);

  /** @ngInject */
  function DriversController(ergastAPI) {
    var vm = this;

    vm.nameFilter = '';
    vm.driversList = [];

    vm.searchFilter = function (driver) {
      var keyword = new RegExp(vm.nameFilter, 'i');
      return !vm.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };

    ergastAPI.getDrivers().success(function (response) {
      //Dig into the responde to get the relevant data
      vm.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  }
})();
