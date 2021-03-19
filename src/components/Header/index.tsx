import React, { FC, memo } from 'react';

import './Header.css';

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => (
  <header className="header">
    <h1>{title}</h1>
  </header>
);

export default memo(Header);
