import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button', () => {
  it('renders the Button correctly', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchInlineSnapshot(`
      <button
        className="btn-add"
        value="submit"
      >
        <span>
          +
        </span>
      </button>
    `);
  });
});
