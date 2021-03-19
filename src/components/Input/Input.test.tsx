import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Input, { Props } from '.';

describe('Input', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      name: 'name',
      value: 'value',
      onChange: jest.fn()
    };
  });

  it('triggers onChange', () => {
    const wrapper = renderer.create(<Input {...props} />);

    act(() => {
      wrapper.root
        .findByType('input')
        .props.onChange({ target: { value: 'new task' } });
    });

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith({
      target: { value: 'new task' }
    });
  });

  it('renders correctly', () => {
    const wrapper = renderer.create(<Input {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <label
        htmlFor="add-todo"
      >
        <input
          className="input-new-task"
          id="add-todo"
          name="name"
          onChange={[MockFunction]}
          placeholder="Add ToDo"
          type="text"
          value="value"
        />
      </label>
    `);
  });
});
