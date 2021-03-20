import React, { FC, ChangeEvent, memo } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { nanoid } from 'nanoid';

import { TaskDefinition } from '../../types';

import { List } from '..';

import './DoneTasks.css';

interface Props {
  tasks: TaskDefinition[];
  onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
  onDone(key: string): void;
  onDelete(key: string): void;
  onDragEnd: any;
}

const DoneTasks: FC<Props> = ({
  tasks,
  onChange,
  onDone,
  onDelete,
  onDragEnd
}) => (
  <DragDropContext
    onDragStart={() => {}}
    onDragUpdate={() => {}}
    onDragEnd={result => onDragEnd(result, false)}
  >
    <Droppable droppableId={nanoid()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            transition: '250ms',
            opacity: snapshot.isDraggingOver ? 0.8 : 1
          }}
        >
          <div className="doneTasks-wrapper">
            <h4 className="doneTasks-content">Done</h4>
            <List
              isDoneTasks
              items={tasks}
              onDone={onDone}
              onDelete={onDelete}
              onChange={onChange}
            />
          </div>
          <div>{provided.placeholder}</div>
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default memo(DoneTasks);
