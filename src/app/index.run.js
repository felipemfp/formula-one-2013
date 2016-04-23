(function() {
  'use strict';

  angular
    .module('helloAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
