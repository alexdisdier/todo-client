import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent
} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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

      taskToUpdate.content = value;

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
      content: input,
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

  const handleOnDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newTasks: TaskDefinition[] = [...tasks];
    const taskToUpdate: any = newTasks.find(task => task.key === draggableId);

    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, taskToUpdate);

    localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(newTasks));

    setTasks(newTasks);
  };

  return (
    <div className="app">
      <Header title={APP_TITLE} />
      <Container>
        <form onSubmit={handleOnSubmit}>
          <Button />
          <Input name="input" value={input} onChange={handleOnChange} />
        </form>
        <DragDropContext
          onDragStart={() => {}}
          onDragUpdate={() => {}}
          onDragEnd={handleOnDragEnd}
        >
          <Droppable droppableId={nanoid()}>
            {(provided, snapshot) => (
              <>
                <div
                  ref={provided.innerRef}
                  // style={{
                  //   transition: '250ms',
                  //   background: snapshot.isDraggingOver ? 'grey' : 'unset',
                  //   opacity: snapshot.isDraggingOver ? 0.8 : 1
                  // }}
                >
                  {pendingTasks.length > 0 && (
                    <PendingTasks
                      tasks={pendingTasks}
                      onChange={handleOnChange}
                      onDone={handleOnDoneTask}
                      onDelete={handleOnDelete}
                      {...provided.droppableProps}
                    />
                  )}
                  {provided.placeholder}
                </div>
                <div>
                  {doneTasks.length > 0 && (
                    <DoneTasks
                      tasks={doneTasks}
                      onChange={handleOnChange}
                      onDone={handleOnDoneTask}
                      onDelete={handleOnDelete}
                    />
                  )}
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </div>
  );
};

export default App;
