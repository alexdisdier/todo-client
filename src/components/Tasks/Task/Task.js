import React from "react";

import "./Task.css";

const task = props => {
  return (
    <>
      <li
        className="card-task"
        draggable="true"
        onDrag={event => props.onDrag(event, props.index)}
        onDrop={event => props.onDrop(event, props.index)}
      >
        <span onClick={() => props.handleDelete(props.index)}>X</span>
        <span
          className={props.isDone ? "cross-task" : ""}
          onClick={() => props.handleCrossOut(props.index)}
        >
          {props.title}
        </span>
      </li>
    </>
  );
};

export default task;
