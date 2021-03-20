import renderer from 'react-test-renderer';
import React from 'react';
import App from './App';

const mockTasks = [
  {
    key: 'UL98O',
    content: 'test',
    isDone: true,
    date: '2021-03-12T23:35:43.026Z'
  },
  {
    key: 'dI4GC',
    content: 'something',
    isDone: false,
    date: '2021-03-12T23:35:47.416Z'
  }
];

export const createRenderer = (component: any, cb?: any) => {
  let tree;
  renderer.act(() => {
    tree = renderer.create(component);
  });
  if (cb) {
    tree = cb(tree);
  }
  return tree;
};

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'nanoid')
}));

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

global.localStorage = {
  getItem: jest.fn((...args) => mockGetItem(...args)),
  setIem: jest.fn((...args) => mockSetItem(...args))
} as any;

jest.mock('./components', () => ({
  Button: 'Button',
  Container: 'Container',
  DoneTasks: 'DoneTasks',
  Header: 'Header',
  Input: 'Input',
  PendingTasks: 'PendingTasks'
}));

describe('App', () => {
  describe('render()', () => {
    it('renders an empty todo list', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => '[]')
        },
        writable: true
      });

      const mockJSONparse = jest.fn((...args) => []);
      JSON.parse = jest
        .fn()
        .mockImplementationOnce((...args) => mockJSONparse(...args));

      const wrapper = createRenderer(<App />);

      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith(
        'alexdisdier-tasks'
      );

      expect(mockJSONparse).toHaveBeenCalledTimes(1);
      expect(mockJSONparse).toHaveBeenCalledWith('[]');

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          className="app"
        >
          <Header
            title="To Do"
          />
          <Container>
            <form
              onSubmit={[Function]}
            >
              <Button />
              <Input
                name="input"
                onChange={[Function]}
                value=""
              />
            </form>
          </Container>
        </div>
      `);
    });

    it('renders two tasks, one done, one pending', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(
            () =>
              '[{"key":"UL98O","content":"test","isDone":true,"date":"2021-03-12T23:35:43.026Z"},{"key":"dI4GC","content":"something","isDone":false,"date":"2021-03-12T23:35:47.416Z"}]'
          ),
          setItem: jest.fn(() => [{ key: 'key' }])
        },
        writable: true
      });

      const mockJSONparse = jest.fn((...args) => mockTasks);
      JSON.parse = jest
        .fn()
        .mockImplementationOnce((...args) => mockJSONparse(...args));

      const wrapper = createRenderer(<App />);

      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith(
        'alexdisdier-tasks'
      );

      expect(mockJSONparse).toHaveBeenCalledTimes(1);
      expect(mockJSONparse).toHaveBeenCalledWith(JSON.stringify(mockTasks));

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          className="app"
        >
          <Header
            title="To Do"
          />
          <Container>
            <form
              onSubmit={[Function]}
            >
              <Button />
              <Input
                name="input"
                onChange={[Function]}
                value=""
              />
            </form>
            <PendingTasks
              onChange={[Function]}
              onDelete={[Function]}
              onDone={[Function]}
              tasks={
                Array [
                  Object {
                    "content": "something",
                    "date": "2021-03-12T23:35:47.416Z",
                    "isDone": false,
                    "key": "dI4GC",
                  },
                ]
              }
            />
            <DoneTasks
              onChange={[Function]}
              onDelete={[Function]}
              onDone={[Function]}
              tasks={
                Array [
                  Object {
                    "content": "test",
                    "date": "2021-03-12T23:35:43.026Z",
                    "isDone": true,
                    "key": "UL98O",
                  },
                ]
              }
            />
          </Container>
        </div>
      `);
    });
  });
});
