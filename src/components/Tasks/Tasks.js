import React from "react";

import Task from "./Task/Task";
import LoaderHOC from "../../HOC/LoaderHOC";

import "./Tasks.css";

const tasks = props => {
  const {
    tasks,
    handleDelete,
    handleCrossOut,
    draggedTask,
    onDrag,
    onDrop
  } = props;
  const lastIndex = tasks.length;

  return (
    <ul className="card">
      {tasks.map((task, index) => (
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
export default LoaderHOC("tasks")(tasks);
