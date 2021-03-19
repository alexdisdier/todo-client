import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent
} from 'react';
import { nanoid } from 'nanoid';

import { TaskDefinition } from './types';

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
  const [tasks, setTasks] = useState<TaskDefinition[]>([]);

  useEffect(() => {
    buildTasks();
  }, []);

  const buildTasks = (): void => {
    const localStorageTasks =
      localStorage.getItem(LOCALSTORAGE_KEY_TASKS) || '[]';

    setTasks(JSON.parse(localStorageTasks) || []);
  };

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, key?: string) => {
      const { value } = event.target;

      if (!key) return setInput(value);

      const newTasks: TaskDefinition[] = [...tasks];

      const taskToUpdate = newTasks.find(task => task.key === key);

      if (!taskToUpdate) return;

      taskToUpdate.title = value;

      localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(newTasks));

      setTasks(newTasks);
    },
    [tasks]
  );

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const lastIndex: number = tasks.length;
    const task = {
      key: nanoid(5),
      title: input,
      isDone: false,
      date: new Date(),
      pos: lastIndex + 1
    } as TaskDefinition;

    const newTasks = [...tasks, task];

    localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(newTasks));

    setInput('');
    setTasks(newTasks);
  };

  /**
   * - toggles crossing out a task
   * - sorts the list by done task
   */
  const handleOnDoneTask = useCallback(
    (key: string): void => {
      const newTasks: TaskDefinition[] = [...tasks];

      const taskToUpdate = newTasks.find(task => task.key === key);

      if (!taskToUpdate) return;

      taskToUpdate.isDone = !taskToUpdate.isDone;

      newTasks.sort((a, b) => {
        if (a.isDone === b.isDone) return 0;
        if (a.isDone) return -1;
        return 1;
      });

      localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(newTasks));

      setTasks(newTasks);
    },
    [tasks]
  );

  const handleOnDelete = useCallback(
    (key: string): void => {
      const newTasks: TaskDefinition[] = [...tasks];

      const filteredTasks = newTasks.filter(task => task.key !== key);

      localStorage.setItem(
        LOCALSTORAGE_KEY_TASKS,
        JSON.stringify(filteredTasks)
      );

      setTasks(filteredTasks);
    },
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter(({ isDone }) => isDone === false),
    [tasks]
  );

  const doneTasks = useMemo(
    () => tasks.filter(({ isDone }) => isDone === true),
    [tasks]
  );

  return (
    <>
      <Header title={APP_TITLE} />
      <Container>
        <form onSubmit={handleOnSubmit}>
          <Button />
          <Input name="input" value={input} onChange={handleOnChange} />
        </form>
        {pendingTasks.length > 0 && (
          <PendingTasks
            tasks={pendingTasks}
            onChange={handleOnChange}
            onDone={handleOnDoneTask}
            onDelete={handleOnDelete}
          />
        )}
        {doneTasks.length > 0 && (
          <DoneTasks
            tasks={doneTasks}
            onChange={handleOnChange}
            onDone={handleOnDoneTask}
            onDelete={handleOnDelete}
          />
        )}
      </Container>
    </>
  );
};

export default App;
