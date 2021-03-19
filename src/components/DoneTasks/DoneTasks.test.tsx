import React from 'react';
import renderer, { act } from 'react-test-renderer';

import DoneTasks from '.';

jest.mock('..', () => ({
  List: 'List'
}));

describe('DoneTasks', () => {
  let props: any;

  beforeEach(() => {
    props = {
      tasks: [
        {
          key: 'nanoid1',
          title: 'GraphQL',
          date: '2019-07-09T10:22:02.876Z',
          isDone: false
        },
        {
          key: 'nanoid2',
          title: 'React',
          date: '2019-09-23T05:18:31.813Z',
          isDone: false
        }
      ],
      onChange: jest.fn(),
      onDelete: jest.fn(),
      onDone: jest.fn()
    };
  });

  describe('actions', () => {
    it('triggers onDone', () => {
      const wrapper = renderer.create(<DoneTasks {...props} />);

      act(() => {
        wrapper.root.findByType('List').props.onDone();
      });

      expect(props.onDone).toHaveBeenCalledTimes(1);
    });

    it('triggers onDelete', () => {
      const wrapper = renderer.create(<DoneTasks {...props} />);

      act(() => {
        wrapper.root.findByType('List').props.onDelete();
      });

      expect(props.onDelete).toHaveBeenCalledTimes(1);
    });

    it('triggers onChange', () => {
      const wrapper = renderer.create(<DoneTasks {...props} />);

      act(() => {
        wrapper.root.findByType('List').props.onChange();
      });

      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('render()', () => {
    it('renders 2 tasks correctly', () => {
      const wrapper = renderer.create(<DoneTasks {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <div
          className="doneTasks-wrapper"
        >
          <h4
            className="doneTasks-title"
          >
            Done
          </h4>
          <List
            isDoneTasks={true}
            items={
              Array [
                Object {
                  "date": "2019-07-09T10:22:02.876Z",
                  "isDone": false,
                  "key": "nanoid1",
                  "title": "GraphQL",
                },
                Object {
                  "date": "2019-09-23T05:18:31.813Z",
                  "isDone": false,
                  "key": "nanoid2",
                  "title": "React",
                },
              ]
            }
            onChange={[MockFunction]}
            onDelete={[MockFunction]}
            onDone={[MockFunction]}
          />
        </div>
      `);
    });
  });
});
