import React from 'react';
import renderer, { act } from 'react-test-renderer';

import List from '.';

jest.mock('..', () => ({
  Item: 'Item'
}));

describe('List', () => {
  let props: any;

  beforeEach(() => {
    props = {
      items: [
        {
          key: 'nanoid1',
          content: 'GraphQL',
          date: '2019-07-09T10:22:02.876Z',
          isDone: false
        },
        {
          key: 'nanoid2',
          content: 'React',
          date: '2019-09-23T05:18:31.813Z',
          isDone: false
        }
      ],
      onChange: jest.fn(),
      onDelete: jest.fn(),
      onDone: jest.fn(),
      isDoneTasks: false
    };
  });

  describe('actions', () => {
    it('triggers onDone', () => {
      const wrapper = renderer.create(<List {...props} />);

      act(() => {
        wrapper.root.findAllByType('Item')[0].props.onDone();
      });

      expect(props.onDone).toHaveBeenCalledTimes(1);
    });

    it('triggers onDelete', () => {
      const wrapper = renderer.create(<List {...props} />);

      act(() => {
        wrapper.root.findAllByType('Item')[0].props.onDelete();
      });

      expect(props.onDelete).toHaveBeenCalledTimes(1);
    });

    it('triggers onChange', () => {
      const wrapper = renderer.create(<List {...props} />);

      act(() => {
        wrapper.root.findAllByType('Item')[0].props.onChange();
      });

      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('render()', () => {
    it('renders a List with 2 pending tasks', () => {
      const wrapper = renderer.create(<List {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <ul
          className="list-wrapper"
          data-is-done-tasks={false}
        >
          <Item
            index={0}
            onChange={[MockFunction]}
            onDelete={[MockFunction]}
            onDone={[MockFunction]}
            value={
              Object {
                "content": "GraphQL",
                "isDone": false,
                "key": "nanoid1",
              }
            }
          />
          <Item
            index={1}
            onChange={[MockFunction]}
            onDelete={[MockFunction]}
            onDone={[MockFunction]}
            value={
              Object {
                "content": "React",
                "isDone": false,
                "key": "nanoid2",
              }
            }
          />
        </ul>
      `);
    });

    it('renders a List with 2 done tasks', () => {
      props.isDoneTasks = true;
      props.items[0].isDone = true;
      props.items[1].isDone = true;

      const wrapper = renderer.create(<List {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <ul
          className="list-wrapper"
          data-is-done-tasks={true}
        >
          <Item
            index={0}
            onChange={[MockFunction]}
            onDelete={[MockFunction]}
            onDone={[MockFunction]}
            value={
              Object {
                "content": "GraphQL",
                "isDone": true,
                "key": "nanoid1",
              }
            }
          />
          <Item
            index={1}
            onChange={[MockFunction]}
            onDelete={[MockFunction]}
            onDone={[MockFunction]}
            value={
              Object {
                "content": "React",
                "isDone": true,
                "key": "nanoid2",
              }
            }
          />
        </ul>
      `);
    });
  });
});
