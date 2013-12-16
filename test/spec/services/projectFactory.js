'use strict';

describe('Service: Projectfactory', function () {

  // load the service's module
  beforeEach(module('wolofApp'));

  // instantiate service
  var Projectfactory;
  beforeEach(inject(function (_Projectfactory_) {
    Projectfactory = _Projectfactory_;
  }));

  it('should do something', function () {
    expect(!!Projectfactory).toBe(true);
  });

});
