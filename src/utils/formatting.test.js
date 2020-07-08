import { inputToAmount, formatAmount, formatRate } from './formatting';

describe('formattin', () => {

    it('inputToAmount can process input into suitable output', () => {
        [
            ['1234.', '1234.'],
            ['', '0'],
            ['123.45.67', '123.'],
            ['9999999999999', '9999999'],
            ['123.4567', '123.46'],
        ].forEach(v => {
            expect(inputToAmount(v[0])).toEqual(v[1]);
        });
    });

    it('can formatAmount', () => {
        expect(formatAmount('123456789.123')).toEqual('123,456,789.12');
    });

    it('can formatRate', () => {
        expect(formatRate('123456789.12345')).toEqual('123456789.1235');
    });

});
