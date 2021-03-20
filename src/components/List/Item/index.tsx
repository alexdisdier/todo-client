import React, { FC, ChangeEvent, useState, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { IconEnums, TaskDefinition } from '../../types';

import { IconButton } from '../..';

import './Item.css';

interface Props {
  index: any;
  value: Pick<TaskDefinition, 'key' | 'content' | 'isDone'>;
  onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
  onDone(key: string): void;
  onDelete(key: string): void;
}

const Item: FC<Props> = ({
  index,
  value: { key, content, isDone },
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
    <Draggable draggableId={key} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          data-testid="item-wrapper"
          data-is-hovered={isHover}
          className="item"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-is-dragging={snapshot.isDragging}
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
                value={content}
                onChange={e => onChange(e, key)}
                autoFocus
              />
            ) : (
              <span
                data-testid="item"
                className={
                  isDone ? 'input-edit-task cross-task' : 'input-edit-task'
                }
                onClick={toggleEditMode}
              >
                {content}
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
      )}
    </Draggable>
  );
};

export default Item;
