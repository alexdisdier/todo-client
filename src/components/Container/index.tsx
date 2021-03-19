import React, { FC, ReactNode } from 'react';

import './Container.css';

const Container: FC<ReactNode> = ({ children }) => (
  <div className="container">{children}</div>
);

export default Container;
