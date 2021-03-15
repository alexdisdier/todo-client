import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent,
  MouseEvent,
  ReactNode
} from 'react';
import { nanoid } from 'nanoid';

import { TaskDefinition } from './types';

import './assets/css/reset.css';
import './App.css';

import Header from './components/Header';
import Tasks from './components/Tasks/Tasks';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Footer from './components/Footer';

const LOCALSTORAGE_KEY_TASKS = 'tasks';
const APP_TITLE = 'To do list';

const App: FC = () => {
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [, setOnDragIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    buildTasks();
  }, []);

  const buildTasks = (): void => {
    const localStorageTasks =
      localStorage.getItem(LOCALSTORAGE_KEY_TASKS) || '[]';

    setTasks(JSON.parse(localStorageTasks) || []);

    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
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
  const handleCrossOut = useCallback(
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

  const handleDelete = useCallback(
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

  const onDrag = (event: MouseEvent, index: number): void => {
    event.preventDefault();

    setOnDragIndex(index);
  };

  const onDragOver = (event: MouseEvent): void => {
    event.preventDefault();
  };

  const onDrop = async (event: MouseEvent, index: string) => {};

  const renderTasks = useMemo((): ReactNode => {
    if (tasks.length === 0)
      return (
        <div style={{ color: 'black' }}>
          Input your first task. It will only be saved in your browser
        </div>
      );

    return (
      <Tasks
        tasks={tasks}
        handleCrossOut={handleCrossOut}
        handleDelete={handleDelete}
        onDrag={onDrag}
        onDrop={onDrop}
        loading={loading}
      />
    );
  }, [handleCrossOut, handleDelete, loading, tasks]);

  return (
    <div className="App">
      <Header title={APP_TITLE} />

      <div
        className="card-container wrapper done"
        style={{
          alignItems: `${tasks.length === 0 ? 'center' : 'unset'}`,
          display: `${tasks.length === 0 ? 'flex' : 'unset'}`
        }}
        onDragOver={onDragOver}
      >
        {renderTasks}
      </div>

      <div className="wrapper">
        <form className="card" onSubmit={handleSubmit}>
          <Input name="input" value={input} handleChange={handleChange} />
          <div className="btn-add-container">
            <Button />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default App;
