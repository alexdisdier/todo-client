import React, { FC, ChangeEvent, memo } from 'react';

import { TaskDefinition } from '../../types';

import { List } from '..';

interface Props {
  tasks: TaskDefinition[];
  onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
  onDone(key: string): void;
  onDelete(key: string): void;
}

const PendingTasks: FC<Props> = ({ tasks, onChange, onDone, onDelete }) => (
  <List items={tasks} onDone={onDone} onDelete={onDelete} onChange={onChange} />
);

export default memo(PendingTasks);
