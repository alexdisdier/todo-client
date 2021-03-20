import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent
} from 'react';

import { TaskDefinition } from './types';

import { addTask, editTask, checkTask, moveTask, deleteTask } from './utils';

import './assets/css/reset.css';
import './App.css';

import {
  Button,
  Container,
  DoneTasks,
  Header,
  Input,
  PendingTasks
} from './components';

const LOCALSTORAGE_KEY_TASKS = 'alexdisdier-tasks';
const APP_TITLE = 'To Do';

const App: FC = () => {
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<any>({
    pending: [],
    done: []
  });

  const buildTasks = useCallback((): void => {
    const localStorageTasks =
      localStorage.getItem(LOCALSTORAGE_KEY_TASKS) || JSON.stringify(tasks);

    setTasks(JSON.parse(localStorageTasks) || { pending: [], done: [] });
  }, [tasks]);

  useEffect(() => {
    buildTasks();
    // We only want to get localStorage data on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, key?: string) => {
      const { value } = event.target;

      if (!key) return setInput(value);

      localStorage.setItem(
        LOCALSTORAGE_KEY_TASKS,
        JSON.stringify(editTask(key, value, tasks))
      );

      setTasks(editTask(key, value, tasks));
    },
    [tasks]
  );

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    localStorage.setItem(
      LOCALSTORAGE_KEY_TASKS,
      JSON.stringify({ ...tasks, pending: addTask(input, tasks.pending) })
    );

    setInput('');
    setTasks({ ...tasks, pending: addTask(input, tasks.pending) });
  };

  /**
   * - toggles crossing out a task
   * - sorts the list by done task
   */
  const handleOnDoneTask = useCallback(
    (key: string): void => {
      localStorage.setItem(
        LOCALSTORAGE_KEY_TASKS,
        JSON.stringify(checkTask(key, tasks))
      );

      setTasks(checkTask(key, tasks));
    },
    [tasks]
  );

  const handleOnDelete = useCallback(
    (key: string): void => {
      localStorage.setItem(
        LOCALSTORAGE_KEY_TASKS,
        JSON.stringify(deleteTask(key, tasks))
      );

      setTasks(deleteTask(key, tasks));
    },
    [tasks]
  );

  const handleOnDragEnd = (result: any, isPending: boolean) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (isPending) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_TASKS,
        JSON.stringify({ ...tasks, pending: moveTask(result, tasks.pending) })
      );

      setTasks({ ...tasks, pending: moveTask(result, tasks.pending) });
    } else {
      localStorage.setItem(
        LOCALSTORAGE_KEY_TASKS,
        JSON.stringify({ ...tasks, done: moveTask(result, tasks.done) })
      );

      setTasks({ ...tasks, done: moveTask(result, tasks.done) });
    }
  };

  return (
    <div className="app">
      <Header title={APP_TITLE} />
      <Container>
        <form onSubmit={handleOnSubmit}>
          <Button />
          <Input name="input" value={input} onChange={handleOnChange} />
        </form>
        {tasks.pending.length > 0 && (
          <PendingTasks
            tasks={tasks.pending}
            onChange={handleOnChange}
            onDone={handleOnDoneTask}
            onDelete={handleOnDelete}
            onDragEnd={handleOnDragEnd}
          />
        )}
        {tasks.done.length > 0 && (
          <DoneTasks
            tasks={tasks.done}
            onChange={handleOnChange}
            onDone={handleOnDoneTask}
            onDelete={handleOnDelete}
            onDragEnd={handleOnDragEnd}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
