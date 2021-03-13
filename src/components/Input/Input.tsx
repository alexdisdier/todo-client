import React, { FC } from 'react';

import './Input.css';

export interface IProps {
  name: string;
  value: string;
  handleChange(event: React.FormEvent<HTMLInputElement>): void;
}

const Input: FC<IProps> = ({ name, value, handleChange }) => (
  <input
    className="card-task"
    placeholder="type some text here"
    type="text"
    name={name}
    value={value}
    onChange={handleChange}
  />
);

export default Input;
