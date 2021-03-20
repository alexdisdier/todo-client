import React from 'react';
import { shallow } from 'enzyme';

import Item from '.';

jest.mock('../..', () => ({
  IconButton: 'IconButton'
}));

describe('Item', () => {
  let props: any;

  beforeEach(() => {
    props = {
      value: {
        key: 'nanoid',
        title: 'title',
        isDone: false
      },
      onChange: jest.fn(),
      onDone: jest.fn(),
      onDelete: jest.fn()
    };
  });

  describe('Actions', () => {
    it('toggles edit mode and edits an item', () => {
      const wrapper = shallow(<Item {...props} />);

      // click on an item
      wrapper
        .find('[data-testid="item"]')
        .simulate('click')
        .props();

      // edit an item
      wrapper
        .find('[data-testid="edit-item"]')
        .simulate('change', { target: { value: 'new task' } });

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith(
        { target: { value: 'new task' } },
        'nanoid'
      );
    });

    it('checks and crosses an item when clicked on the IconCircle button', () => {
      const wrapper = shallow(<Item {...props} />);

      // click on the circle icon
      wrapper
        .find('IconButton')
        .at(0)
        .simulate('click');

      expect(props.onDone).toHaveBeenCalledTimes(1);
      expect(props.onDone).toHaveBeenCalledWith('nanoid');
    });

    it('unchecks an item when clicked on the IconCircleCheck button', () => {
      props.value.isDone = true;
      const wrapper = shallow(<Item {...props} />);

      // click on the checked circle icon
      wrapper
        .find('IconButton')
        .at(0)
        .simulate('click');

      expect(props.onDone).toHaveBeenCalledTimes(1);
      expect(props.onDone).toHaveBeenCalledWith('nanoid');
    });

    it('deletes an Item when clicked on the trash icon', () => {
      const wrapper = shallow(<Item {...props} />);

      // hover the item to reveil the trash icon button
      wrapper.find('[data-testid="item-wrapper"]').simulate('mouseenter');

      // click on the trash icon
      wrapper
        .find('IconButton')
        .at(1)
        .simulate('click');

      expect(props.onDelete).toHaveBeenCalledTimes(1);
      expect(props.onDelete).toHaveBeenCalledWith('nanoid');

      // cursor leaves the item
      wrapper.find('[data-testid="item-wrapper"]').simulate('mouseleave');
    });
  });

  describe('render()', () => {
    it('an Item', () => {
      const wrapper = shallow(<Item {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <li
          className="item"
          data-is-hovered={false}
          data-testid="item-wrapper"
          onMouseEnter={[Function]}
          onMouseLeave={[Function]}
        >
          <div
            className="circle-btn-input-wrapper"
          >
            <div
              className="circle-btn-wrapper"
            >
              <IconButton
                iconName="circle"
                onClick={[Function]}
                testId="check-item"
                tooltip="Check task"
              />
            </div>
            <span
              className="input-edit-task"
              data-testid="item"
              onClick={[Function]}
            >
              title
            </span>
          </div>
        </li>
      `);
    });

    it('a done item crossed out', () => {
      props.isDone = true;
      const wrapper = shallow(<Item {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <li
          className="item"
          data-is-hovered={false}
          data-testid="item-wrapper"
          onMouseEnter={[Function]}
          onMouseLeave={[Function]}
        >
          <div
            className="circle-btn-input-wrapper"
          >
            <div
              className="circle-btn-wrapper"
            >
              <IconButton
                iconName="circle"
                onClick={[Function]}
                testId="check-item"
                tooltip="Check task"
              />
            </div>
            <span
              className="input-edit-task"
              data-testid="item"
              onClick={[Function]}
            >
              title
            </span>
          </div>
        </li>
      `);
    });

    it('an Item hovered', () => {
      const wrapper = shallow(<Item {...props} />);

      // hover the item to reveil the trash icon button
      wrapper.find('[data-testid="item-wrapper"]').simulate('mouseenter');

      expect(wrapper).toMatchInlineSnapshot(`
        <li
          className="item"
          data-is-hovered={true}
          data-testid="item-wrapper"
          onMouseEnter={[Function]}
          onMouseLeave={[Function]}
        >
          <div
            className="circle-btn-input-wrapper"
          >
            <div
              className="circle-btn-wrapper"
            >
              <IconButton
                iconName="circle"
                onClick={[Function]}
                testId="check-item"
                tooltip="Check task"
              />
            </div>
            <span
              className="input-edit-task"
              data-testid="item"
              onClick={[Function]}
            >
              title
            </span>
          </div>
          <IconButton
            iconName="trash"
            onClick={[Function]}
            testId="delete-task"
            tooltip="Delete task"
          />
        </li>
      `);

      // cursor leaves the item
      wrapper.find('[data-testid="item-wrapper"]').simulate('mouseleave');
    });
  });
});
