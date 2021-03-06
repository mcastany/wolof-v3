'use strict';

describe('Directive: hgColumnChart', function () {

  // load the directive's module
  beforeEach(module('wolofApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hg-column-chart></hg-column-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hgColumnChart directive');
  }));
});
