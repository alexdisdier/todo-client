import React, { FC, useMemo } from 'react';

import { ReactComponent as Circle } from '../../assets/img/circle.svg';
import { ReactComponent as CircleCheck } from '../../assets/img/circleCheck.svg';
import { ReactComponent as SwipingTrash } from '../../assets/img/swipingTrash.svg';
import { ReactComponent as Trash } from '../../assets/img/trash.svg';

import { IconEnums } from '../types';

import './IconButton.css';

interface Props {
  iconName: string;
  tooltip: string;
  testId: string;
  onClick: () => void;
}

const IconButton: FC<Props> = ({ iconName, tooltip, testId, onClick }) => {
  const renderIcon = useMemo(() => {
    switch (iconName) {
      case IconEnums.Circle:
        return <Circle />;

      case IconEnums.CircleCheck:
        return <CircleCheck />;

      case IconEnums.Trash:
        return <Trash />;

      case IconEnums.SwipingTrash:
        return <SwipingTrash />;

      default:
        return <Circle />;
    }
  }, [iconName]);

  return (
    <button
      className="icon-button"
      data-testid={testId}
      type="button"
      title={tooltip}
      onClick={onClick}
    >
      {renderIcon}
    </button>
  );
};

export default IconButton;
