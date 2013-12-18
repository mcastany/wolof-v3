'use strict';

describe('Directive: wEditable', function () {

  // load the directive's module
  beforeEach(module('wolofApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<w-editable></w-editable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the wEditable directive');
  }));
});
