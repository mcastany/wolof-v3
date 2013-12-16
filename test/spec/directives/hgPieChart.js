'use strict';

describe('Directive: hgPieChart', function () {

  // load the directive's module
  beforeEach(module('wolofApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hg-pie-chart></hg-pie-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hgPieChart directive');
  }));
});
