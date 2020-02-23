import React from "react";
import { shallow } from "enzyme";

import withLoading from "./withLoading";

describe("withLoading", () => {
  it("should render the Loading component if a prop name is passed", () => {
    const wrapper = shallow(<withLoading />);

    expect(wrapper).toMatchInlineSnapshot(`<withLoading />`);
  });

  it("should render the wrapped component if no prop name is passed", () => {
    const WrappedComponent = <div>I'm a wrapped component</div>;
    const ConditionalComponent = withLoading(WrappedComponent);
    const wrapper = shallow(<ConditionalComponent propName />);

    expect(wrapper).toMatchInlineSnapshot(`
      <[object Object]
        propName={true}
      />
    `);
  });
});
