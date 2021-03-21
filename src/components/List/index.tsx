import React, { FC, ChangeEvent, useContext } from 'react';

import { Item } from '..';

import SwipeableItem from './SwipeableItem';

import { TodoContext } from '../../App';

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
  const { isMobileAndTablet } = useContext(TodoContext);

  return (
    <ul className="list-wrapper" data-is-done-tasks={isDoneTasks}>
      {items.map(({ key, content, isDone }, index) =>
        isMobileAndTablet ? (
          <SwipeableItem
            key={key}
            value={{ index, key, content, isDone, onChange, onDone, onDelete }}
          />
        ) : (
          <Item
            key={key}
            index={index}
            value={{ key, content, isDone }}
            onDelete={onDelete}
            onDone={onDone}
            onChange={onChange}
          />
        )
      )}
    </ul>
  );
};

export default List;
