import React, { FC, ChangeEvent } from 'react';

import { Item } from '..';

import { TasksDefinition } from '../../types';

import './List.css';

interface Props {
  items: TasksDefinition;
  onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
  onDelete(key: string): void;
  onDone(key: string): void;
  isDoneTasks?: boolean;
}

const List: FC<Props> = ({
  items,
  onDelete,
  onDone,
  onChange,
  isDoneTasks
}) => {
  return (
    <ul className="list-wrapper" data-is-done-tasks={isDoneTasks}>
      {items.map(({ key, title, isDone }) => (
        <Item
          key={key}
          value={{ key, title, isDone }}
          onDelete={onDelete}
          onDone={onDone}
          onChange={onChange}
        />
      ))}
    </ul>
  );
};

export default List;
