import React, { FC, ChangeEvent, useState, useCallback } from 'react';

import { IconEnums, TaskDefinition } from '../../types';

import { IconButton } from '../..';

import './Item.css';

interface Props {
  value: Pick<TaskDefinition, 'key' | 'title' | 'isDone'>;
  onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
  onDone(key: string): void;
  onDelete(key: string): void;
}

const Item: FC<Props> = ({
  value: { key, title, isDone },
  onChange,
  onDone,
  onDelete
}) => {
  const [editMode, setEditMode] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const toggleEditMode = useCallback(() => setEditMode(!editMode), [editMode]);

  const handleOnKeyDown = useCallback(
    ({ key }: { key: string }): any => key === 'Enter' && toggleEditMode(),
    [toggleEditMode]
  );

  return (
    <li
      data-testid="item-wrapper"
      data-is-hovered={isHover}
      className="item"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="circle-btn-input-wrapper">
        <div className="circle-btn-wrapper">
          {isDone ? (
            <IconButton
              iconName={IconEnums.CircleCheck}
              tooltip="Uncheck task"
              testId="uncheck-task"
              onClick={() => onDone(key)}
            />
          ) : (
            <IconButton
              iconName={IconEnums.Circle}
              tooltip="Check task"
              testId="check-item"
              onClick={() => onDone(key)}
            />
          )}
        </div>
        {editMode ? (
          <input
            data-testid="edit-item"
            className="input-edit-task"
            onBlur={toggleEditMode}
            onKeyDown={handleOnKeyDown}
            value={title}
            onChange={e => onChange(e, key)}
            autoFocus
          />
        ) : (
          <span
            data-testid="item"
            className={isDone ? 'cross-task' : ''}
            onClick={toggleEditMode}
          >
            {title}
          </span>
        )}
      </div>
      {isHover && (
        <IconButton
          iconName={IconEnums.Trash}
          tooltip="Delete task"
          testId="delete-task"
          onClick={() => onDelete(key)}
        />
      )}
    </li>
  );
};

export default Item;
