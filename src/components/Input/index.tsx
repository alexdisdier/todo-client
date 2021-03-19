import React, { FC } from 'react';

import './Input.css';

export interface Props {
  name: string;
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): void;
}

const Input: FC<Props> = ({ name, value, onChange }) => (
  <label htmlFor="add-todo">
    <input
      id="add-todo"
      className="input-new-task"
      placeholder="Add ToDo"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  </label>
);

export default Input;
