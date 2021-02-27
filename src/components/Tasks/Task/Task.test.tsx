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
    it("drags and drops a task", () => {
      const wrapper = shallow(<Task {...props} />);
      wrapper
        .find("li")
        .at(0)
        .simulate("drag");

      expect(props.onDrag).toHaveBeenCalled();
      expect(props.onDrag).toHaveBeenCalledWith(undefined, "1");

      wrapper
        .find("li")
        .at(0)
        .simulate("drop");

      expect(props.onDrop).toHaveBeenCalled();
      expect(props.onDrop).toHaveBeenCalledWith(undefined, "1");
    });

    it("deletes a task when clicked on the cross", () => {
      const wrapper = shallow(<Task {...props} />);

      wrapper
        .find('[data-testid="delete-task"]')
        .simulate("click")
        .props();

      expect(props.handleDelete).toHaveBeenCalledTimes(1);
      expect(props.handleDelete).toHaveBeenCalledWith("1");
    });

    it("crosses out a task when clicked on the task itself", () => {
      const wrapper = shallow(<Task {...props} />);

      wrapper
        .find('[data-testid="task"]')
        .simulate("click")
        .props();

      expect(props.handleCrossOut).toHaveBeenCalledTimes(1);
      expect(props.handleCrossOut).toHaveBeenCalledWith("1");
    });
  });

  describe("render()", () => {
    it("renders a single task crossed out", () => {
      props.isDone = true;
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
              className="cross-task"
              data-testid="task"
              onClick={[Function]}
            >
              title
            </span>
            <span
              data-testid="delete-task"
              onClick={[Function]}
            >
              X
            </span>
          </li>
        </Fragment>
      `);
    });

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
              className=""
              data-testid="task"
              onClick={[Function]}
            >
              title
            </span>
            <span
              data-testid="delete-task"
              onClick={[Function]}
            >
              X
            </span>
          </li>
        </Fragment>
      `);
    });
  });
});
