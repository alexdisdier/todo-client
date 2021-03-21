import React from 'react';
import renderer from 'react-test-renderer';

import SwipeableItem from '.';

jest.mock('../Item', () => 'Item');

jest.mock('react-swipeable-views', () => 'SwipeableViews');

describe('SwipeableItem', () => {
  let props: any;

  beforeEach(() => {
    props = {
      value: {
        index: 0,
        key: 'nanoid1',
        content: 'GraphQL',
        isDone: false,
        onChange: jest.fn(),
        onDelete: jest.fn(),
        onDone: jest.fn(),
        isDoneTasks: false
      }
    };
  });

  describe('render()', () => {
    it('renders a swipeable item', () => {
      const wrapper = renderer.create(<SwipeableItem {...props} />);

      expect(wrapper).toMatchInlineSnapshot(`
        <SwipeableViews
          animateHeight={true}
          enableMouseEvents={true}
          hysteresis={0.5}
          onChangeIndex={[Function]}
          resistance={true}
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
          <li
            className="swipingTrashWrapper"
          >
            <button
              className="icon-button"
              data-testid="delete-task"
              onClick={[Function]}
              title="Delete tash"
              type="button"
            >
              <svg>
                swipingTrash.svg
              </svg>
            </button>
          </li>
        </SwipeableViews>
      `);
    });
  });
});
