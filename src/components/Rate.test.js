import React from 'react';
import { shallow } from 'enzyme';
import { Rate } from './Rate';

describe('Rate component', () => {
    it('renders both currencies and the ratio', () => {
        const wrapper = shallow(<Rate baseCcy="EUR" termsCcy="USD" rate={1.123456789} />);
        expect(wrapper.text()).toEqual('💱 EUR 1 = USD 1.123456789');
    });
});
