import React from "react";
import { shallow } from "enzyme";

import Task from "./Task";

describe("Task", () => {
  let props: any;

  beforeEach(() => {
    props = {
      title: "title",
      index: "1",
      isDone: false,
      handleDelete: jest.fn(),
      handleCrossOut: jest.fn(),
      draggedTask: jest.fn(),
      onDrag: jest.fn(),
      onDrop: jest.fn()
    };
  });

  describe("Actions", () => {
    it("deletes a task when clicked on the cross", () => {
      const wrapper = shallow(<Task {...props} />);

      wrapper
        .find("span")
        .at(0)
        .simulate("click")
        .props();

      expect(props.handleDelete).toHaveBeenCalledTimes(1);
      expect(props.handleDelete).toHaveBeenCalledWith("1");
    });

    it("crosses out a task when clicked on the task itself", () => {
      const wrapper = shallow(<Task {...props} />);

      wrapper
        .find("span")
        .at(1)
        .simulate("click")
        .props();

      expect(props.handleCrossOut).toHaveBeenCalledTimes(1);
      expect(props.handleCrossOut).toHaveBeenCalledWith("1");
    });
  });

  describe("render()", () => {
    it("renders a single Task correctly", () => {
      const wrapper = shallow(<Task {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Fragment>
          <li
            className="card-task"
            draggable={true}
            onDrag={[Function]}
            onDrop={[Function]}
          >
            <span
              onClick={[Function]}
            >
              X
            </span>
            <span
              className=""
              onClick={[Function]}
            >
              title
            </span>
          </li>
        </Fragment>
      `);
    });
  });
});
