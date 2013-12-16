'use strict';

describe('Controller: SummaryctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('wolofApp'));

  var SummaryctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SummaryctrlCtrl = $controller('SummaryctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
