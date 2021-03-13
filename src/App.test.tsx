import renderer from 'react-test-renderer';
import React from 'react';
import App from './App';

const mockTasks = [
  {
    key: 'UL98O',
    title: 'test',
    isDone: true,
    date: '2021-03-12T23:35:43.026Z',
    pos: 1
  },
  {
    key: 'dI4GC',
    title: 'something',
    isDone: false,
    date: '2021-03-12T23:35:47.416Z',
    pos: 3
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

jest.mock('./components/Header', () => 'Header');
jest.mock('./components/Input/Input', () => 'Input');
jest.mock('./components/Button/Button', () => 'Button');
jest.mock('./components/Footer', () => 'Footer');

jest.mock('./components/Error/Error', () => 'Error');

describe('App', () => {
  describe('render()', () => {
    it('renders an empty todo list', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => '[]')
          // setItem: jest.fn(() => [{ key: 'key' }])
        },
        writable: true
      });

      const mockJSONparse = jest.fn((...args) => []);
      JSON.parse = jest
        .fn()
        .mockImplementationOnce((...args) => mockJSONparse(...args));

      const wrapper = createRenderer(<App />);

      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith('tasks');

      expect(mockJSONparse).toHaveBeenCalledTimes(1);
      expect(mockJSONparse).toHaveBeenCalledWith('[]');

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          className="App"
        >
          <Header
            title="To do list"
          />
          <div
            className="card-container wrapper done"
            onDragOver={[Function]}
            style={
              Object {
                "alignItems": "center",
                "display": "flex",
              }
            }
          >
            <div
              style={
                Object {
                  "color": "black",
                }
              }
            >
              Input your first task. It will only be saved in your browser
            </div>
          </div>
          <div
            className="wrapper"
          >
            <form
              className="card"
              onSubmit={[Function]}
            >
              <Input
                handleChange={[Function]}
                name="input"
                value=""
              />
              <div
                className="btn-add-container"
              >
                <Button />
              </div>
            </form>
          </div>
          <Footer />
        </div>
      `);
    });

    it('renders two tasks', async () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(
            () =>
              '[{"key":"UL98O","title":"test","isDone":true,"date":"2021-03-12T23:35:43.026Z","pos":1},{"key":"dI4GC","title":"something","isDone":false,"date":"2021-03-12T23:35:47.416Z","pos":3}]'
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
      expect(window.localStorage.getItem).toHaveBeenCalledWith('tasks');

      expect(mockJSONparse).toHaveBeenCalledTimes(1);
      expect(mockJSONparse).toHaveBeenCalledWith(JSON.stringify(mockTasks));

      expect(wrapper).toMatchInlineSnapshot(`
        <div
          className="App"
        >
          <Header
            title="To do list"
          />
          <div
            className="card-container wrapper done"
            onDragOver={[Function]}
            style={
              Object {
                "alignItems": "unset",
                "display": "unset",
              }
            }
          >
            <ul
              className="card"
              style={
                Object {
                  "height": "calc(100vh - 300px)",
                  "overflowY": "scroll",
                }
              }
            >
              <li
                className="card-task"
                draggable={true}
                onDrag={[Function]}
                onDrop={[Function]}
              >
                <span
                  className="cross-task"
                  data-testid="task"
                  onClick={[Function]}
                >
                  test
                </span>
                <span
                  data-testid="delete-task"
                  onClick={[Function]}
                >
                  X
                </span>
              </li>
              <li
                className="card-task"
                draggable={true}
                onDrag={[Function]}
                onDrop={[Function]}
              >
                <span
                  className=""
                  data-testid="task"
                  onClick={[Function]}
                >
                  something
                </span>
                <span
                  data-testid="delete-task"
                  onClick={[Function]}
                >
                  X
                </span>
              </li>
              <li
                className="card-task"
                id="last-index"
                onDrop={[Function]}
              >
                <span>
                   
                </span>
              </li>
            </ul>
          </div>
          <div
            className="wrapper"
          >
            <form
              className="card"
              onSubmit={[Function]}
            >
              <Input
                handleChange={[Function]}
                name="input"
                value=""
              />
              <div
                className="btn-add-container"
              >
                <Button />
              </div>
            </form>
          </div>
          <Footer />
        </div>
      `);
    });
  });
});
