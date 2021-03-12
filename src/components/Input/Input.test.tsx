import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

describe('Input', () => {
    let props: any;

    beforeEach(() => {
        props = {
            name: 'name',
            value: 'value',
            handleChange: jest.fn(),
        };
    });

    it('renders correctly', () => {
        const wrapper = shallow(<Input {...props} />);
        expect(wrapper).toMatchInlineSnapshot(`
      <input
        className="card-task"
        name="name"
        onChange={[MockFunction]}
        placeholder="type some text here"
        type="text"
        value="value"
      />
    `);
    });
});
