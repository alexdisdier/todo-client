import React from "react";

import "./Task.css";

interface IProps {
  title: string;
  isDone: boolean;
  index: number;
  onDrag(event: React.MouseEvent, index: number): void;
  onDrop(event: React.MouseEvent, index: number): void;
  handleDelete(index: number): void;
  handleCrossOut(index: number): void;
}

const Task: React.FC<IProps> = (props: IProps) => {
  const {
    title,
    onDrag,
    onDrop,
    index,
    isDone,
    handleDelete,
    handleCrossOut
  } = props;

  return (
    <>
      <li
        className="card-task"
        draggable={true}
        onDrag={event => onDrag(event, index)}
        onDrop={event => onDrop(event, index)}
      >
        <span
          data-testid="task"
          className={isDone ? "cross-task" : ""}
          onClick={() => handleCrossOut(index)}
        >
          {title}
        </span>
        <span data-testid="delete-task" onClick={() => handleDelete(index)}>X</span>
      </li>
    </>
  );
};

export default Task;
