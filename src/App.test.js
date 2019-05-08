import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import App from "./App";
import Input from "./components/Input/Input";

/*  
  We're using Jest as our test runner. It will provide the describe, it and expect and toEqual functions.
  We're using Enzyme for the shallow wrapper which gives us the method find
*/

configure({ adapter: new Adapter() });

// TESTING THE VIEW
describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders a form area", () => {
    const form = shallow(<App />);
    expect(form.find("form").length).toEqual(1);
  });

  // it("should change the state after we change the input value", () => {
  //   const newValue = "testing component";
  //   const wrapper = mount(<App />);
  //   const input = wrapper.find("input");
  //   input.simulate("change", { target: { value: newValue } });

  //   expect(wrapper.state().basicValue).toEqual(newValue);
  // });

  // it("renders an Input Component", () => {
  //   const wrapper = mount(<App />);
  //   expect(wrapper.find(<Input />).length).toEqual(1);
  // });
});
