import React from "react";

const header = props => {
  return (
    <header>
      <h1 className="wrapper">{props.title}</h1>
    </header>
  );
};

export default header;
