import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Input, { IProps } from './Input';

describe('Input', () => {
  let props: IProps;

  beforeEach(() => {
    props = {
      name: 'name',
      value: 'value',
      handleChange: jest.fn()
    };
  });

  it('triggers onChange', () => {
    const wrapper = renderer.create(<Input {...props} />);

    act(() => {
      wrapper.root
        .findByType('input')
        .props.onChange({ target: { value: 'new task' } });
    });

    expect(props.handleChange).toHaveBeenCalledTimes(1);
    expect(props.handleChange).toHaveBeenCalledWith({
      target: { value: 'new task' }
    });
  });

  it('renders correctly', () => {
    const wrapper = renderer.create(<Input {...props} />);

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
