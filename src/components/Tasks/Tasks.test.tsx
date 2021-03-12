import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Tasks from './Tasks';

jest.mock('./Task/Task', () => 'Task');

describe('Tasks', () => {
  let props: any;

  beforeEach(() => {
    props = {
      tasks: [
        {
          key: 'nanoid1',
          date: '2019-07-09T10:22:02.876Z',
          title: 'GraphQL',
          isDone: false,
          pos: 3
        },
        {
          key: 'nanoid2',
          date: '2019-09-23T05:18:31.813Z',
          title: 'React',
          isDone: false,
          pos: 2
        }
      ],
      handleDelete: jest.fn(),
      handleCrossOut: jest.fn(),
      onDrag: jest.fn(),
      onDrop: jest.fn()
    };
  });

  describe('render()', () => {
    it('renders a loading gif if empty tasks array', () => {
      props.tasks = [];
      const wrapper = shallow(<Tasks {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Tasks
          handleCrossOut={[MockFunction]}
          handleDelete={[MockFunction]}
          onDrag={[MockFunction]}
          onDrop={[MockFunction]}
          tasks={Array []}
        />
      `);
    });

    it('renders 2 tasks correctly', () => {
      const wrapper = renderer.create(<Tasks {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <ul
          className="card"
          style={
            Object {
              "height": "calc(100vh - 300px)",
              "overflowY": "scroll",
            }
          }
        >
          <Task
            handleCrossOut={[MockFunction]}
            handleDelete={[MockFunction]}
            onDrag={[MockFunction]}
            onDrop={[MockFunction]}
            value={
              Object {
                "isDone": false,
                "key": "nanoid1",
                "title": "GraphQL",
              }
            }
          />
          <Task
            handleCrossOut={[MockFunction]}
            handleDelete={[MockFunction]}
            onDrag={[MockFunction]}
            onDrop={[MockFunction]}
            value={
              Object {
                "isDone": false,
                "key": "nanoid2",
                "title": "React",
              }
            }
          />
          <li
            className="card-task"
            id="last-index"
            onDrop={[Function]}
          >
            <span>
               
            </span>
          </li>
        </ul>
      `);
    });
  });
});
