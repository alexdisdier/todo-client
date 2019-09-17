import React from "react";
import { shallow } from "enzyme";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders the Footer correctly", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchInlineSnapshot(`<footer />`);
  });
});
