import React from 'react';
import { shallow } from 'enzyme';

import Container from '.';

describe('Container', () => {
  it('renders some children in a container', () => {
    const wrapper = shallow(
      <Container>
        <div>some children</div>
      </Container>
    );

    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="container"
      >
        <div>
          some children
        </div>
      </div>
    `);
  });
});
