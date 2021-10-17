// province 생성자의 인수로 쓸 JSON 데이터 생성.
// test시 해당 함수가 반환한 값을 인수로 넘겨서 Province 객체를 생성해보면 된다.
function sampleProvinceDate() {
  return {
    name: "Asia",
    producers: [
      {name: "AAA", cost: 10, production: 9},
      {name: "BBB", cost: 12, production: 10},
      {name: "CCC", cost: 10, production: 6},
    ],
    demand: 30,
    price: 20
  };
}

// 지역 전체를 표현
class Province {
  constructor(doc) {
    // 지역명
    this._name = doc.name;
    // 생산자 리스트
    this._producers = [];
    // 총수요
    this._totalProduction = 0;
    // 수요
    this._demand = doc.demand;
    // 가격
    this._price = doc.price;
    doc.producers.forEach(d => this.addProducer(new Producer(this, d)));

  }

  get name() { return this._name; }
  get producers() { return this._producers; }
  get totalProduction() { return this._totalProduction; }
  set totalProduction(arg) { this._totalProduction = arg; } 
  get demand() { return this._demand; }
  set demand(arg) { this._demand = parseInt(arg); }
  get price() { return this._price; }
  set price(arg) { this._price = parseInt(arg); }
  // 생산 부족분
  get shortfall() { return this._demand - this.totalProduction; }

  // 수익 계산
  get profit() { return this.demandValue - this.demandCost; }
  get demandValue() { return this.satisfiedDemand * this.price; }
  get satisfiedDemand() { return Math.min(this._demand, this.totalProduction); }
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a,b) => a.cost - b.cost)
      .forEach( p => {
        const contribution = Math.min(remainingDemand, p.production);
          remainingDemand -= contribution;
          result += contribution * p.cost;
      });
    return result;
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}

// 생산자 주로 단순한 데이터 저장소로 사용.
class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._name = data.name;
    this._cost = data.cost;
    this._production = data.production || 0;
  }
  get name() { return this._name; }
  get cost() { return this._cost; }
  set cost(arg) { this._cost = parseInt(arg); }

  get production() { return this._production; }
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    // production에 추가된 개수만큼 총개수에 반영.
    this._province.totalProduction += newProduction - this._production;
    // production에 변경된 개수 할당.
    this._production = newProduction;
  }
  
}

module.exports = { Province, sampleProvinceDate }