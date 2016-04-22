(function() {
  'use strict';

  angular
    .module('helloAngular')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainController',
      //   controllerAs: 'main'
      // })
      .when('/', {
        templateUrl: 'app/drivers/drivers.html',
        controller: 'DriversController',
        controllerAs: 'drivers'
      })
      .when('/drivers/:id', {
        templateUrl: 'app/driver/driver.html',
        controller: 'DriverController',
        controllerAs: 'driver'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
