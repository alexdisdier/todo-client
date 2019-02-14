import React from "react";

import Task from "./Task/Task";

import "./Tasks.css";

const tasks = props => {
  const { handleDelete, handleCrossOut, draggedTask, onDrag, onDrop } = props;
  const lastIndex = props.tasks.length;

  return (
    <ul className="card">
      {props.tasks.map((task, index) => (
        <Task
          key={index}
          handleDelete={handleDelete}
          handleCrossOut={handleCrossOut}
          onDrag={onDrag}
          onDrop={onDrop}
          title={task.title}
          index={index}
          isDone={task.isDone}
          draggedTask={draggedTask}
          task={task}
        />
      ))}
      <li
        className="last-index card-task"
        onDrop={event => onDrop(event, lastIndex)}
      >
        <span> </span>
      </li>
    </ul>
  );
};

export default tasks;
