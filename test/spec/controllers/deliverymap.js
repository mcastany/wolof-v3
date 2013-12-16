'use strict';

describe('Controller: DeliverymapCtrl', function () {

  // load the controller's module
  beforeEach(module('wolofApp'));

  var DeliverymapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeliverymapCtrl = $controller('DeliverymapCtrl', {
      $scope: scope
    });
  }));

  it('should have a list of iterations', function () {
    expect(scope.iterations.length).toBe(5);
  });
});
