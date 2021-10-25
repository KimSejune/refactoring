// const assert = require('assert');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const { Province, sampleProvinceDate } = require('./sample.js');

describe('Province', function () {
  let asia;
  
  // 각각의 테스트 바로 전에 실행되어 asia를 초기화한다.
  beforeEach(function() {
    asia = new Province(sampleProvinceDate());
  });
  it('shortfall', function() {
    // assert.equal(asia.shortfall, 5); // 검증
    expect(asia.shortfall).equal(5); // chai를 사용할 수 있다.
  });

  // 총수익 계산로직 테스트
  it('profit', function() {
    expect(asia.profit).equal(230);
  });

  // 픽스처의 내용 수정 대비
  it('change production', function() {
    // console.log('~~',asia.producers[0])
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  // 숫자형이라면 0일 때를 검사해본다.
  // 수요가 없다.
  it('zero demand', function () {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });
  // 수요가 마이너스이다.
  it('negative demand', function() {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });

  // 수요 입력란이 비어 있다.
  it('empty string demand', function() {
    asia.demand = '';
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});

// 컬렉션이 비었을 경우 대비
describe('no producers', function() {
  let noProducers;
  beforeEach(function() {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it('shorfall', function() {
    expect(noProducers.shortfall).equal(30);
  });

  it('profit', function() {
    expect(noProducers.profit).equal(0);
  });
});

describe('string for producers', function() {
  let prov;
  beforeEach(function() {
    const data = {
      name: "string producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    prov = new Province(data);
  });

  it('', function() {
    expect(prov.shortfall).equal(0);
  });
});