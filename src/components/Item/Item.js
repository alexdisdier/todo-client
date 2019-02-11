import React from "react";

import "./Item.css";

const item = props => {
  return (
    <>
      <li className="card-item">
        <span onClick={() => props.handleDelete(props.index)}>X</span>
        <span
          className={props.crossOut ? "cross-task" : ""}
          onClick={() => props.handleCrossOut(props.index)}
        >
          {props.title}
        </span>
      </li>
    </>
  );
};

export default item;
