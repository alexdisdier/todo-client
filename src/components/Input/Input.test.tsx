import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";

import Input from "./Input";

/*  
  We're using Jest as our test runner. It will provide the describe, it and expect and toEqual functions.
  We're using Enzyme for the shallow wrapper which gives us the method find
*/

configure({ adapter: new Adapter() });

describe("<Input /> rendering", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render an input area", () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find("input").length).toEqual(1);
  });

  it("should render a placeholder", () => {
    const placeholder_text = "type some text here";
    const wrapper = shallow(<Input placeholder={placeholder_text} />);
    expect(wrapper.prop("placeholder")).toEqual(placeholder_text);
  });

  it("should render the correct type", () => {
    const type = "text";
    const wrapper = shallow(<Input type={type} />);
    expect(wrapper.prop("type")).toEqual(type);
  });
});

// describe("<Input /> UI interactions", () => {
//   it("should call onChange prop with input value", () => {
//     const wrapper = shallow(<Input />);
//     wrapper.find("input").simulate("change", {
//       target: {
//         value: "New Comment"
//       }
//     });
//     expect(wrapper.prop("value")).toEqual("New Comment");
//   });
// });
