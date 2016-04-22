(function() {
  'use strict';

  angular
    .module('hiAngular')
    .controller('DriverController', DriverController);

  /** @ngInject */
  function DriverController($timeout, $routeParams, ergastAPI) {
    var vm = this;

    vm.id = $routeParams.id;
    vm.races = [];
    vm.driver = null;

    ergastAPI.getDriverDetails(vm.id).success(function (response) {
        vm.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    });

    ergastAPI.getDriverRaces(vm.id).success(function (response) {
        vm.races = response.MRData.RaceTable.Races;
    });
  }
})();
