import React from "react";

import Task from "./Task/Task";
import withLoading from "../../HOC/withLoading";

import "./Tasks.css";

interface IProps {
  tasks: [];
  // draggedTask: [];
  onDrag(event: React.MouseEvent, index: number): void;
  onDrop(event: React.MouseEvent, index: number): void;
  handleDelete(index: number): void;
  handleCrossOut(index: number): void;
}

const Tasks: React.FC<IProps> = (props: IProps) => {
  const {
    tasks,
    handleDelete,
    handleCrossOut,
    // draggedTask,
    onDrag,
    onDrop,
  } = props;

  const lastIndex = tasks.length;

  return (
    <ul className="card">
      {tasks.map((task: any, index: number) => (
        <Task
          key={index}
          handleDelete={handleDelete}
          handleCrossOut={handleCrossOut}
          onDrag={onDrag}
          onDrop={onDrop}
          title={task.title}
          index={index}
          isDone={task.isDone}
          // draggedTask={draggedTask}
        />
      ))}
      <li
        id="last-index"
        className="card-task"
        onDrop={event => onDrop(event, lastIndex)}
      >
        <span> </span>
      </li>
    </ul>
  );
};

// Currying HOC function where we can pass the props name we need to manipulate.
export default withLoading(Tasks);
