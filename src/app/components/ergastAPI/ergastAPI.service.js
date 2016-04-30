(function() {
  'use_strict';

  angular
    .module('helloAngular')
    .factory('ergastAPI', ergastAPI);

  /** @ngInject */
  function ergastAPI($log, $http) {
    var apiHost = 'http://ergast.com/api/f1/2013'

    var ergastAPI = {
      apiHost: apiHost,
      getDrivers: getDrivers,
      getDriverDetails: getDriverDetails,
      getDriverRaces: getDriverRaces
    };

    return ergastAPI;

    function getDrivers() {
      return $http({
        method: 'JSONP',
        url: apiHost + '/driverStandings.json?callback=JSON_CALLBACK'
      }).then(getDriversComplete).catch(getDriversFailed);

      function getDriversComplete(response) {
        var drivers = response.data
          .MRData.StandingsTable.StandingsLists[0].DriverStandings;
        return drivers;
      }

      function getDriversFailed(error) {
        $log.error('XHR Failed for getDrivers.\n' + angular.toJson(error.data, true));
      }
    }

    function getDriverDetails(id) {
      return $http({
        method: 'JSONP',
        url: apiHost + '/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
      }).then(getDriverDetailsComplete).catch(getDriverDetailsFailed);

      function getDriverDetailsComplete(response) {
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      }

      function getDriverDetailsFailed(error) {
        $log.error('XHR Failed for getDriverDetails.\n' + angular.toJson(error.data, true));
      }
    }

    function getDriverRaces(id) {
      return $http({
        method: 'JSONP',
        url: apiHost + '/drivers/' + id + '/results.json?callback=JSON_CALLBACK'
      }).then(getDriverRacesComplete).catch(getDriverRacesFailed);

      function getDriverRacesComplete(response) {
        return response.data.MRData.RaceTable.Races;
      }

      function getDriverRacesFailed(error) {
        $log.error('XHR Failed for getDriverRaces.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
