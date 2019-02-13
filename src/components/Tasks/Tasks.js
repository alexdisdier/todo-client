import React from "react";

import Task from "./Task/Task";

const tasks = props => {
  return (
    <ul className="card">
      {props.tasks.map((task, index) => (
        <Task
          key={index}
          handleDelete={props.handleDelete}
          handleCrossOut={props.handleCrossOut}
          title={task.title}
          index={index}
          isDone={task.isDone}
        />
      ))}
    </ul>
  );
};

export default tasks;
