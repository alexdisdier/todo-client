import React, { FC } from "react";

import Task from "./Task/Task";
import withLoading from "../../HOC/withLoading";

import { TasksDefinition } from '../../types';

import "./Tasks.css";

interface IProps {
  tasks: TasksDefinition;
  onDrag(event: React.MouseEvent, key: string): void;
  onDrop(event: React.MouseEvent, key: string): void;
  handleDelete(key: string): void;
  handleCrossOut(key: string): void;
}

const Tasks: FC<IProps> = (props: IProps) => {
  const {
    tasks,
    handleDelete,
    handleCrossOut,
    onDrag,
    onDrop,
  } = props;

  const lastIndex = tasks.length;

  return (
    <ul className="card">
      {tasks.map(({ key, title, isDone}) => (
        <Task
          key={key}
          value={{key, title, isDone}}
          handleDelete={handleDelete}
          handleCrossOut={handleCrossOut}
          onDrag={onDrag}
          onDrop={onDrop}
        />
      ))}
      <li
        id="last-index"
        className="card-task"
        onDrop={event => onDrop(event, `${lastIndex}`)}
      >
        <span> </span>
      </li>
    </ul>
  );
};

// Currying HOC function where we can pass the props name we need to manipulate.
export default withLoading(Tasks);
