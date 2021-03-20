import {
  addTask,
  editTask,
  taskIsPending,
  checkTask,
  deleteTask,
  moveTask
} from '.';

describe('utils', () => {
  let mockTasks: any;

  beforeEach(() => {
    mockTasks = {
      pending: [
        {
          content: 'pending task content',
          date: ' 2016-06-20T12:08:10.000Z',
          isDone: false,
          key: 'nanoid1'
        }
      ],
      done: [
        {
          content: 'done task content',
          date: ' 2018-06-20T12:08:10.000Z',
          isDone: true,
          key: 'nanoid2'
        }
      ]
    };
  });

  describe('addTask', () => {
    it('returns an array with a new task', () => {
      const mockDate = new Date(1466424490000);
      const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      expect(addTask('new task content', [])).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "new task content",
            "date": 2016-06-20T12:08:10.000Z,
            "isDone": false,
            "key": "nanoid",
          },
        ]
      `);
      spy.mockRestore();
    });
  });

  describe('editTask', () => {
    it('edits a task in the pending task array', () => {
      expect(
        editTask('nanoid1', 'edited pending task', mockTasks).pending[0].content
      ).toEqual('edited pending task');
    });

    it('edits a task in the done task array', () => {
      expect(
        editTask('nanoid2', 'edited done task', mockTasks).done[0].content
      ).toEqual('edited done task');
    });
  });

  describe('taskIsPending', () => {
    it('returns true', () => {
      expect(taskIsPending('nanoid1', mockTasks.pending)).toBeTruthy();
    });

    it('return false', () => {
      expect(taskIsPending('nanoid1', mockTasks.done)).toBeFalsy();
    });
  });

  describe('checkTask', () => {
    it('checks a task', () => {
      expect(mockTasks.pending[0].isDone).toBeFalsy();

      checkTask('nanoid1', mockTasks);

      expect(mockTasks.pending[0].isDone).toBeTruthy();
    });

    it('unchecks a task', () => {
      expect(mockTasks.done[0].isDone).toBeTruthy();

      checkTask('nanoid2', mockTasks);

      expect(mockTasks.done[0].isDone).toBeFalsy();
    });
  });

  describe('deleteTask', () => {
    it('deletes a task from pending', () => {
      expect(mockTasks.pending).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "pending task content",
            "date": " 2016-06-20T12:08:10.000Z",
            "isDone": false,
            "key": "nanoid1",
          },
        ]
      `);

      deleteTask('nanoid1', mockTasks);

      expect(mockTasks.pending).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "pending task content",
            "date": " 2016-06-20T12:08:10.000Z",
            "isDone": false,
            "key": "nanoid1",
          },
        ]
      `);
    });

    it('deletes a task from done', async () => {
      expect(mockTasks.done).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "done task content",
            "date": " 2018-06-20T12:08:10.000Z",
            "isDone": true,
            "key": "nanoid2",
          },
        ]
      `);

      deleteTask('nanoid2', mockTasks);

      expect(mockTasks.done).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "done task content",
            "date": " 2018-06-20T12:08:10.000Z",
            "isDone": true,
            "key": "nanoid2",
          },
        ]
      `);
    });
  });

  describe('moveTask', () => {
    let result: any;

    beforeEach(() => {
      result = {
        destination: {
          index: 0,
          droppableId: 'nanoid1'
        },
        source: {
          index: 1,
          droppableId: 'nanoid0'
        }
      };
    });

    it('returns undefined if no destination', () => {
      result.destination = null;

      expect(moveTask(result, mockTasks.pending)).toBeUndefined();
    });

    it("returns undefined if destination and source's ids and indexes match", () => {
      result.destination.index = 0;
      result.source.index = 0;

      result.destination.droppableId = 'droppableId1';
      result.source.droppableId = 'droppableId1';

      expect(moveTask(result, mockTasks.pending)).toBeUndefined();
    });

    it('moves a task in pending', () => {
      mockTasks.pending.push({
        key: 'nanoid0',
        data: 'date',
        content: 'I will be first',
        isDone: false
      });

      expect(mockTasks.pending).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "pending task content",
            "date": " 2016-06-20T12:08:10.000Z",
            "isDone": false,
            "key": "nanoid1",
          },
          Object {
            "content": "I will be first",
            "data": "date",
            "isDone": false,
            "key": "nanoid0",
          },
        ]
      `);

      moveTask(result, mockTasks.pending);

      expect(mockTasks.pending).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "pending task content",
            "date": " 2016-06-20T12:08:10.000Z",
            "isDone": false,
            "key": "nanoid1",
          },
          Object {
            "content": "I will be first",
            "data": "date",
            "isDone": false,
            "key": "nanoid0",
          },
        ]
      `);
    });

    it('moves a task in done', async () => {
      expect(mockTasks.done).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "done task content",
            "date": " 2018-06-20T12:08:10.000Z",
            "isDone": true,
            "key": "nanoid2",
          },
        ]
      `);

      moveTask(result, mockTasks.done);

      expect(mockTasks.done).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": "done task content",
            "date": " 2018-06-20T12:08:10.000Z",
            "isDone": true,
            "key": "nanoid2",
          },
        ]
      `);
    });
  });
});
