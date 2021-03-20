import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Item from '.';

jest.mock('../..', () => ({
  IconButton: 'IconButton'
}));

describe('Item', () => {
  let props: any;

  beforeEach(() => {
    props = {
      index: 0,
      value: {
        key: 'nanoid',
        content: 'content',
        isDone: false
      },
      onChange: jest.fn(),
      onDone: jest.fn(),
      onDelete: jest.fn()
    };
  });

  describe('Actions', () => {
    it('toggles edit mode and edits an item', () => {
      const wrapper = renderer.create(<Item {...props} />);

      act(() => {
        // click on an item
        wrapper.root.findByProps({ 'data-testid': 'item' }).props.onClick();
      });

      act(() => {
        // edit an item
        wrapper.root
          .findByProps({ 'data-testid': 'edit-item' })
          .props.onChange({ target: { value: 'new task' } });
      });

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith(
        { target: { value: 'new task' } },
        'nanoid'
      );
    });

    it('checks and crosses an item when clicked on the IconCircle button', () => {
      const wrapper = renderer.create(<Item {...props} />);

      act(() =>
        // click on the circle icon
        // @ts-ignore
        wrapper.root.findAllByType('IconButton')[0].props.onClick()
      );

      expect(props.onDone).toHaveBeenCalledTimes(1);
      expect(props.onDone).toHaveBeenCalledWith('nanoid');
    });

    it('unchecks an item when clicked on the IconCircleCheck button', () => {
      props.value.isDone = true;
      const wrapper = renderer.create(<Item {...props} />);

      act(() =>
        // click on the checked circle icon
        // @ts-ignore
        wrapper.root.findAllByType('IconButton')[0].props.onClick()
      );

      expect(props.onDone).toHaveBeenCalledTimes(1);
      expect(props.onDone).toHaveBeenCalledWith('nanoid');
    });

    it('deletes an Item when clicked on the trash icon', () => {
      const wrapper = renderer.create(<Item {...props} />);

      act(() => {
        // hover the item to reveil the trash icon button

        wrapper.root
          .findByProps({ 'data-testid': 'item-wrapper' })
          .props.onMouseEnter();
      });

      act(() =>
        // click on the trash icon
        // @ts-ignore
        wrapper.root.findAllByType('IconButton')[1].props.onClick()
      );

      expect(props.onDelete).toHaveBeenCalledTimes(1);
      expect(props.onDelete).toHaveBeenCalledWith('nanoid');

      act(() => {
        // cursor leaves the item

        wrapper.root
          .findByProps({ 'data-testid': 'item-wrapper' })
          .props.onMouseLeave();
      });
    });
  });

  describe('render()', () => {
    it('an Item', () => {
      const wrapper = renderer.create(<Item {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          draggableId="nanoid"
          id="Draggable"
          index={0}
        >
          <li
            className="item"
            data-is-hovered={false}
            data-testid="item-wrapper"
            onMouseEnter={[Function]}
            onMouseLeave={[Function]}
            otherProps="dragHandleProps"
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
                content
              </span>
            </div>
          </li>
        </div>
      `);
    });

    it('a done item crossed out', () => {
      props.isDone = true;
      const wrapper = renderer.create(<Item {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          draggableId="nanoid"
          id="Draggable"
          index={0}
        >
          <li
            className="item"
            data-is-hovered={false}
            data-testid="item-wrapper"
            onMouseEnter={[Function]}
            onMouseLeave={[Function]}
            otherProps="dragHandleProps"
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
                content
              </span>
            </div>
          </li>
        </div>
      `);
    });

    it('an Item hovered', () => {
      const wrapper = renderer.create(<Item {...props} />);

      act(() => {
        // hover the item to reveil the trash icon button
        wrapper.root
          .findByProps({ 'data-testid': 'item-wrapper' })
          .props.onMouseEnter();
      });

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          draggableId="nanoid"
          id="Draggable"
          index={0}
        >
          <li
            className="item"
            data-is-hovered={true}
            data-testid="item-wrapper"
            onMouseEnter={[Function]}
            onMouseLeave={[Function]}
            otherProps="dragHandleProps"
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
                content
              </span>
            </div>
            <IconButton
              iconName="trash"
              onClick={[Function]}
              testId="delete-task"
              tooltip="Delete task"
            />
          </li>
        </div>
      `);

      // cursor leaves the item
      act(() => {
        // hover the item to reveil the trash icon button
        wrapper.root
          .findByProps({ 'data-testid': 'item-wrapper' })
          .props.onMouseLeave();
      });
    });
  });
});
