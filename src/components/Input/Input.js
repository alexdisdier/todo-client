import React from "react";
import "./Input.css";

const input = props => (
  <input
    className="card-task"
    placeholder="type some text here"
    type="text"
    name={props.name}
    value={props.value}
    onChange={props.handleChange}
  />
);

export default input;
