'use strict';

describe('Service: new', function () {

  // load the service's module
  beforeEach(module('readyCenterYoApp'));

  // instantiate service
  var new;
  beforeEach(inject(function (_new_) {
    new = _new_;
  }));

  it('should do something', function () {
    expect(!!new).toBe(true);
  });

});
