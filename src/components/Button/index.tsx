import React, { FC, memo } from 'react';

import { ReactComponent as AddCircle } from '../../assets/img/plusCircle.svg';

import './Button.css';

const Button: FC = () => (
  <button className="submit-button" type="submit" title="Add todo">
    <AddCircle />
  </button>
);

export default memo(Button);
