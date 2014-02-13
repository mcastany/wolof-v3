'use strict';

describe('Service: Socketdeliverymap', function () {

  // load the service's module
  beforeEach(module('wolofApp'));

  // instantiate service
  var Socketdeliverymap;
  beforeEach(inject(function (_Socketdeliverymap_) {
    Socketdeliverymap = _Socketdeliverymap_;
  }));

  it('should do something', function () {
    expect(!!Socketdeliverymap).toBe(true);
  });

});
