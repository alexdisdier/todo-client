import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="loader center-page loader--style1"
        title="0"
      >
        <img
          alt="loading gif"
          src="loading.svg"
        />
      </div>
    `);
  });
});
