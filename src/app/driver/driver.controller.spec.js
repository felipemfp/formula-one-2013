(function() {
  'use strict';

  describe('controllers', function() {
    var vm, $httpBackend, ergastAPI, $routeParams;

    beforeEach(module('helloAngular'));
    beforeEach(inject(function(_$controller_, _$routeParams_, _$httpBackend_, _ergastAPI_) {
      $routeParams = _$routeParams_;
      $routeParams.id = 'vettel';
      vm = _$controller_('DriverController');
      $httpBackend = _$httpBackend_;
      ergastAPI = _ergastAPI_;

      $httpBackend
        .expectJSONP(ergastAPI.apiHost + '/drivers/' + vm.id + '/driverStandings.json?callback=JSON_CALLBACK')
        .respond({
          "MRData": {
            "xmlns": "http:\/\/ergast.com\/mrd\/1.4",
            "series": "f1",
            "url": "http://ergast.com/api/f1/2013/drivers/vettel/driverstandings.json",
            "limit": "30",
            "offset": "0",
            "total": "1",
            "StandingsTable": {
              "season": "2013",
              "driverId": "vettel",
              "StandingsLists": [{
                "season": "2013",
                "round": "19",
                "DriverStandings": [{
                  "position": "1",
                  "positionText": "1",
                  "points": "397",
                  "wins": "13",
                  "Driver": {
                    "driverId": "vettel",
                    "permanentNumber": "5",
                    "code": "VET",
                    "url": "http:\/\/en.wikipedia.org\/wiki\/Sebastian_Vettel",
                    "givenName": "Sebastian",
                    "familyName": "Vettel",
                    "dateOfBirth": "1987-07-03",
                    "nationality": "German"
                  },
                  "Constructors": [{
                    "constructorId": "red_bull",
                    "url": "http:\/\/en.wikipedia.org\/wiki\/Red_Bull_Racing",
                    "name": "Red Bull",
                    "nationality": "Austrian"
                  }]
                }]
              }]
            }
          }
        });

      $httpBackend
        .expectJSONP(ergastAPI.apiHost + '/drivers/' + vm.id + '/results.json?callback=JSON_CALLBACK')
        .respond({
          "MRData": {
            "xmlns": "http:\/\/ergast.com\/mrd\/1.4",
            "series": "f1",
            "url": "http://ergast.com/api/f1/2013/drivers/vettel/results.json",
            "limit": "30",
            "offset": "0",
            "total": "19",
            "RaceTable": {
              "season": "2013",
              "driverId": "vettel",
              "Races": [{
                "season": "2013",
                "round": "1",
                "url": "http:\/\/en.wikipedia.org\/wiki\/2013_Australian_Grand_Prix",
                "raceName": "Australian Grand Prix",
                "date": "2013-03-17",
                "time": "06:00:00Z"
              }, {
                "season": "2013",
                "round": "2",
                "url": "http:\/\/en.wikipedia.org\/wiki\/2013_Malaysian_Grand_Prix",
                "raceName": "Malaysian Grand Prix",
                "date": "2013-03-24",
                "time": "08:00:00Z"
              }, {
                "season": "2013",
                "round": "3",
                "url": "http:\/\/en.wikipedia.org\/wiki\/2013_Chinese_Grand_Prix",
                "raceName": "Chinese Grand Prix",
                "date": "2013-04-14",
                "time": "07:00:00Z"
              }]
            }
          }
        });

      $httpBackend.flush();
    }));

    it('should return a list with three races', function() {
      expect(vm.races.length).toBe(3);
    });

    it('should return a object named driver', function() {
      expect(vm.driver).toEqual(jasmine.any(Object));
    });
  });
})();
