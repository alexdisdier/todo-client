import React from 'react';
import { shallow } from 'enzyme';

import Button from '.';

jest.mock('../../assets/img/plusCircle.svg', () => ({
  ReactComponent: 'AddCircleIcon'
}));

describe('Button', () => {
  it('renders the Button correctly', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchInlineSnapshot(`
      <button
        className="submit-button"
        title="Add todo"
        type="submit"
      >
        <AddCircleIcon />
      </button>
    `);
  });
});
