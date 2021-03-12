import React, { FC } from 'react';

import { TaskDefinition } from '../../../types';

import './Task.css';

interface IProps {
    onDrag(event: React.MouseEvent, key: string): void;
    onDrop(event: React.MouseEvent, key: string): void;
    handleDelete(key: string): void;
    handleCrossOut(key: string): void;
    value: Pick<TaskDefinition, 'key' | 'title' | 'isDone'>;
}

const Task: FC<IProps> = (props: IProps) => {
    const {
        value: { key, title, isDone },
        onDrag,
        onDrop,
        handleDelete,
        handleCrossOut,
    } = props;

    return (
        <>
            <li
                className="card-task"
                draggable={true}
                onDrag={event => onDrag(event, key)}
                onDrop={event => onDrop(event, key)}
            >
                <span data-testid="task" className={isDone ? 'cross-task' : ''} onClick={() => handleCrossOut(key)}>
                    {title}
                </span>
                <span data-testid="delete-task" onClick={() => handleDelete(key)}>
                    X
                </span>
            </li>
        </>
    );
};

export default Task;
