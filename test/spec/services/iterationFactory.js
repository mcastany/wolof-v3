'use strict';

describe('Service: Iterationfactory', function () {

  // load the service's module
  beforeEach(module('wolofApp'));

  // instantiate service
  var Iterationfactory;
  beforeEach(inject(function (_Iterationfactory_) {
    Iterationfactory = _Iterationfactory_;
  }));

  it('should do something', function () {
    expect(!!Iterationfactory).toBe(true);
  });

});
