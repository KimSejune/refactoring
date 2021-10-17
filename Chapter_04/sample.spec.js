const assert = require('assert');

const { Province, sampleProvinceDate } = require('./sample.js');

describe('Province', function () {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceDate());
    assert.equal(asia.shortfall, 5);
  });
});