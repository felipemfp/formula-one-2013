(function() {
  'use strict';

  describe('service ergastAPI', function() {
    var ergastAPI;
    var $httpBackend;
    var $log;

    beforeEach(module('helloAngular'));

    beforeEach(inject(function(_ergastAPI_, _$httpBackend_, _$log_) {
      ergastAPI = _ergastAPI_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(ergastAPI).not.toEqual(null);
    });

    describe('apiHost variable', function() {
      it('should exist', function() {
        expect(ergastAPI.apiHost).not.toEqual(null);
      });
    });

    describe('getDrivers function', function() {
      it('should exist', function() {
        expect(ergastAPI.getDrivers).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend
          .expectJSONP(ergastAPI.apiHost + '/driverStandings.json?callback=JSON_CALLBACK')
          .respond({
            "MRData": {
              "StandingsTable": {
                "StandingsLists": [{
                  "DriverStandings": [{
                    "Driver": {
                      "givenName": 'Sebastian',
                      "familyName": 'Vettel'
                    },
                    "points": "397",
                    "nationality": "German",
                    "Constructors": [{
                      "name": "Red Bull"
                    }]
                  }, {
                    "Driver": {
                      "givenName": 'Fernando',
                      "familyName": 'Alonso'
                    },
                    "points": "242",
                    "nationality": "Spanish",
                    "Constructors": [{
                      "name": "Ferrari"
                    }]
                  }, {
                    "Driver": {
                      "givenName": 'Mark',
                      "familyName": 'Webber'
                    },
                    "points": "199",
                    "nationality": "Australian",
                    "Constructors": [{
                      "name": "Red Bull"
                    }]
                  }]
                }]
              }
            }
          });
        var data;
        ergastAPI.getDrivers().then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should log a error', function() {
        $httpBackend
          .expectJSONP(ergastAPI.apiHost + '/driverStandings.json?callback=JSON_CALLBACK')
          .respond(500);
        ergastAPI.getDrivers();
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });

    describe('getDriverDetails function', function() {
      it('should exist', function() {
        expect(ergastAPI.getDriverDetails).not.toEqual(null);
      });

      it('should return data', function() {
        var id = 'vettel';
        $httpBackend
          .expectJSONP(ergastAPI.apiHost + '/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK')
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
        var data;
        ergastAPI.getDriverDetails(id).then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Object));
      });

      it('should log a error', function() {
        var id = 'someone';
        $httpBackend
          .expectJSONP(ergastAPI.apiHost + '/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK')
          .respond(500);
        ergastAPI.getDriverDetails(id);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });

    describe('getDriverRaces function', function() {
      it('should exist', function() {
        expect(ergastAPI.getDriverRaces).not.toEqual(null);
      });

      it('should return data', function() {
        var id = 'vettel';
        $httpBackend
          .expectJSONP(ergastAPI.apiHost + '/drivers/' + id + '/results.json?callback=JSON_CALLBACK')
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
        var data;
        ergastAPI.getDriverRaces(id).then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should log a error', function() {
        var id = 'someone';
        $httpBackend
          .expectJSONP(ergastAPI.apiHost + '/drivers/' + id + '/results.json?callback=JSON_CALLBACK')
          .respond(500);
        ergastAPI.getDriverRaces(id);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });
  });
})();
