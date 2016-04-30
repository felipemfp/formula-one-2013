!function(){"use strict";angular.module("helloAngular",["ngRoute"])}(),function(){"use_strict";function r(r,e){function t(){function t(r){var e=r.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;return e}function i(e){r.error("XHR Failed for getDrivers.\n"+angular.toJson(e.data,!0))}return e({method:"JSONP",url:a+"/driverStandings.json?callback=JSON_CALLBACK"}).then(t)["catch"](i)}function i(t){function i(r){return r.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]}function n(e){r.error("XHR Failed for getDriverDetails.\n"+angular.toJson(e.data,!0))}return e({method:"JSONP",url:a+"/drivers/"+t+"/driverStandings.json?callback=JSON_CALLBACK"}).then(i)["catch"](n)}function n(t){function i(r){return r.data.MRData.RaceTable.Races}function n(e){r.error("XHR Failed for getDriverRaces.\n"+angular.toJson(e.data,!0))}return e({method:"JSONP",url:a+"/drivers/"+t+"/results.json?callback=JSON_CALLBACK"}).then(i)["catch"](n)}var a="http://ergast.com/api/f1/2013",d={apiHost:a,getDrivers:t,getDriverDetails:i,getDriverRaces:n};return d}r.$inject=["$log","$http"],angular.module("helloAngular").factory("ergastAPI",r)}(),function(){"use strict";function r(r){var e=this;e.loading=!0,e.nameFilter="",e.driversList=[],e.searchFilter=function(r){var t=new RegExp(e.nameFilter,"i");return!e.nameFilter||t.test(r.Driver.givenName)||t.test(r.Driver.familyName)},r.getDrivers().then(function(r){e.driversList=r,e.loading=!1})}r.$inject=["ergastAPI"],angular.module("helloAngular").controller("DriversController",r)}(),function(){"use strict";function r(r,e){var t=this;t.id=r.id,t.loading=!0,t.races=[],t.driver=null,e.getDriverDetails(t.id).then(function(r){t.driver=r}),e.getDriverRaces(t.id).then(function(r){t.races=r,t.loading=!1})}r.$inject=["$routeParams","ergastAPI"],angular.module("helloAngular").controller("DriverController",r)}(),function(){"use strict";function r(r){r.debug("runBlock end")}r.$inject=["$log"],angular.module("helloAngular").run(r)}(),function(){"use strict";function r(r){r.when("/",{templateUrl:"app/drivers/drivers.view.html",controller:"DriversController",controllerAs:"drivers"}).when("/drivers/:id",{templateUrl:"app/driver/driver.view.html",controller:"DriverController",controllerAs:"driver"}).otherwise({redirectTo:"/"})}r.$inject=["$routeProvider"],angular.module("helloAngular").config(r)}(),function(){"use strict";angular.module("helloAngular")}(),function(){"use strict";function r(r){r.debugEnabled(!0)}r.$inject=["$logProvider"],angular.module("helloAngular").config(r)}(),angular.module("helloAngular").run(["$templateCache",function(r){r.put("app/driver/driver.view.html",'<div class=container><a href=./#/drivers><i class="tiny material-icons">arrow_back</i> Back to drivers list</a><div id=secondary class=main-nav><div><h3><img ng-src=assets/images/helmet.svg width=4% style=vertical-align:top> {{driver.driver.Driver.givenName}} {{driver.driver.Driver.familyName}}</h3></div><div class=driver-status><b>Country</b>: {{driver.driver.Driver.nationality}}<br><b>Team</b>: {{driver.driver.Constructors[0].name}}<br><b>Birth</b>: {{driver.driver.Driver.dateOfBirth}}<br><a href={{driver.driver.Driver.url}} target=_blank>Biography <i class="tiny material-icons">open_in_new</i></a></div></div><div><h5>Formula 1 2013 Results</h5><table class=striped><thead><tr><th>Round</th><th>Grand Prix</th><th>Team</th><th>Grid</th><th>Race</th></tr></thead><tbody><tr ng-repeat="race in driver.races"><td>{{race.round}}</td><td>{{race.raceName}}</td><td>{{race.Results[0].Constructor.name}}</td><td>{{race.Results[0].grid}}</td><td>{{race.Results[0].position}}</td></tr></tbody></table><div class=progress ng-show=driver.loading><div class=indeterminate></div></div></div></div>'),r.put("app/drivers/drivers.view.html",'<div class=container><input type=text ng-model=drivers.nameFilter placeholder=Search...><table><thead><tr><th colspan=4>Drivers Championship Standings</th></tr></thead><tbody><tr ng-repeat="driver in drivers.driversList | filter: drivers.searchFilter"><td>{{$index + 1}}</td><td><a href=#/drivers/{{driver.Driver.driverId}}>{{driver.Driver.givenName}}&nbsp;{{driver.Driver.familyName}}</a></td><td>{{driver.Constructors[0].name}}</td><td>{{driver.points}}</td></tr></tbody></table><div class=progress ng-show=drivers.loading><div class=indeterminate></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-6cd70de056.js.map
