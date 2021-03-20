import { nanoid } from 'nanoid';
import { TaskDefinition } from '../components/types';

export const addTask = (
  input: string,
  tasks: TaskDefinition[]
): TaskDefinition[] => {
  const task = {
    key: nanoid(5),
    content: input,
    isDone: false,
    date: new Date()
  } as any;

  const newTasks: TaskDefinition[] = [...tasks, task];

  return newTasks;
};

export const editTask = (
  key: string,
  value: string,
  tasks: { pending: TaskDefinition[]; done: TaskDefinition[] }
): { pending: TaskDefinition[]; done: TaskDefinition[] } => {
  let newPendingTasks = [...tasks.pending];
  let newDoneTasks = [...tasks.done];

  if (taskIsPending(key, newPendingTasks)) {
    newPendingTasks.find(task => task.key === key)!.content = value;
  } else {
    newDoneTasks.find(task => task.key === key)!.content = value;
  }

  return {
    pending: newPendingTasks,
    done: newDoneTasks
  };
};

export const taskIsPending = (key: string, tasks: TaskDefinition[]): boolean =>
  tasks.findIndex(task => task.key === key) > -1;

export const checkTask = (
  key: string,
  tasks: any
): { pending: TaskDefinition[]; done: TaskDefinition[] } | undefined => {
  const newPendingTasks: TaskDefinition[] = [...tasks.pending];
  const newDoneTasks: TaskDefinition[] = [...tasks.done];

  const updatePendingIndex: number = newPendingTasks.findIndex(
    task => task.key === key
  );
  const updateDoneIndex: number = newDoneTasks.findIndex(
    task => task.key === key
  );

  if (updatePendingIndex === -1 && updateDoneIndex === -1) return;

  if (updateDoneIndex === -1) {
    const taskToUpdate = newPendingTasks[updatePendingIndex];
    taskToUpdate.isDone = true;
    newPendingTasks.splice(updatePendingIndex, 1);
    newDoneTasks.push(taskToUpdate);
  }

  if (updatePendingIndex === -1) {
    const taskToUpdate = newDoneTasks[updateDoneIndex];
    taskToUpdate.isDone = false;
    newDoneTasks.splice(updateDoneIndex, 1);
    newPendingTasks.push(taskToUpdate);
  }

  return {
    pending: newPendingTasks,
    done: newDoneTasks
  };
};

export const deleteTask = (
  key: string,
  tasks: { pending: TaskDefinition[]; done: TaskDefinition[] }
): { pending: TaskDefinition[]; done: TaskDefinition[] } => {
  let newPendingTasks = [...tasks.pending];
  let newDoneTasks = [...tasks.done];

  if (taskIsPending(key, tasks.pending)) {
    newPendingTasks = tasks.pending.filter(task => task.key !== key);
  } else {
    newDoneTasks = tasks.done.filter(task => task.key !== key);
  }

  return {
    pending: newPendingTasks,
    done: newDoneTasks
  };
};

export const moveTask = (result: any, tasks: TaskDefinition[]) => {
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

  return newTasks;
};
