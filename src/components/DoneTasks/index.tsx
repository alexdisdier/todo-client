import React, { FC, ChangeEvent, memo } from 'react';

import { TaskDefinition } from '../../types';

import { List } from '..';

import './DoneTasks.css';

interface Props {
  tasks: TaskDefinition[];
  onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
  onDone(key: string): void;
  onDelete(key: string): void;
}

const DoneTasks: FC<Props> = ({ tasks, onChange, onDone, onDelete }) => (
  <div className="doneTasks-wrapper">
    <h4 className="doneTasks-title">Done</h4>
    <List
      isDoneTasks
      items={tasks}
      onDone={onDone}
      onDelete={onDelete}
      onChange={onChange}
    />
  </div>
);

export default memo(DoneTasks);
