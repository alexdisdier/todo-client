import React from 'react';
import { shallow } from 'enzyme';

import Header from '.';

describe('Header', () => {
  let props: any;

  beforeEach(() => {
    props = {
      title: 'title'
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchInlineSnapshot(`
      <header
        className="header"
      >
        <h1>
          title
        </h1>
      </header>
    `);
  });
});
