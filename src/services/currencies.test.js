import { fetchRate, fetchCurrenciesList } from './currencies';

describe('Currencies service', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ rates: { AUD: 1.234, EUR: 1.555 } }),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });
    
    it('can fetch currencies list', async () => {
        const result = await fetchCurrenciesList();
        expect(global.fetch).toHaveBeenCalledWith('https://api.exchangeratesapi.io/latest?base=GBP');
        expect(result).toEqual(["AUD", "EUR"]);
    });

    it('can fetch rates', async () => {
        const result = await fetchRate('GBP', 'EUR');
        expect(global.fetch).toHaveBeenCalledWith('https://api.exchangeratesapi.io/latest?symbols=EUR&base=GBP');
        expect(result).toEqual(1.555);
    });
});
