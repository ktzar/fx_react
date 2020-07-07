const API_HOST = 'https://api.exchangeratesapi.io';

export function fetchRate(baseCcy, termsCcy) {
    return fetch(`${API_HOST}/latest?symbols=${termsCcy}&base=${baseCcy}`)
        .then(d => d.json())
        .then(d => d.rates[termsCcy]);
}

export function fetchCurrenciesList() {
    return fetch(API_HOST + '/latest?base=GBP')
        .then(d => d.json())
        .then(d => {const ccys = Object.keys(d.rates); ccys.sort(); return ccys;});
}
