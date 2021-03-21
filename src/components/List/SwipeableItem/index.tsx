import React, { FC, ChangeEvent, memo } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { IconButton } from '../..';

import Item from '../Item';

import './SwipeableItem.css';

interface Props {
  value: {
    index: number;
    key: string;
    content: string;
    isDone: boolean;
    onChange(event: ChangeEvent<HTMLInputElement>, key?: string): void;
    onDelete(key: string): void;
    onDone(key: string): void;
  };
}

const SwipeableItem: FC<Props> = ({ value }) => {
  const { index, key, content, isDone, onChange, onDone, onDelete } = value;

  const handleAction = (key: string, index: any) => {
    if (index === 1) {
      setTimeout(() => onDelete(key), 500);
    }
  };

  return (
    <SwipeableViews
      key={key}
      enableMouseEvents
      hysteresis={0.5}
      resistance
      animateHeight
      onChangeIndex={props => handleAction(key, props)}
    >
      <Item
        index={index}
        value={{ key, content, isDone }}
        onDelete={onDelete}
        onDone={onDone}
        onChange={onChange}
      />
      <li className="swipingTrashWrapper">
        <IconButton
          iconName="swipingTrash"
          tooltip="Delete tash"
          testId="delete-task"
          onClick={() => onDelete(key)}
        />
      </li>
    </SwipeableViews>
  );
};

export default memo(SwipeableItem);
