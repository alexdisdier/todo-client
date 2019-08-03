import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const input = ({ name, value, handleChange }) => (
  <input
    className="card-task"
    placeholder="type some text here"
    type="text"
    name={name}
    value={value}
    onChange={handleChange}
  />
);

input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func
};

export default input;
