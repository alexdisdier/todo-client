import React from "react";
import { shallow } from "enzyme";

import Header from "./Header";

describe("Header", () => {
  let props: any;

  beforeEach(() => {
    props = {
      title: "title"
    };
  });

  it("renders correctly", () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchInlineSnapshot(`
      <header>
        <h1
          className="wrapper"
        >
          title
        </h1>
      </header>
    `);
  });
});
