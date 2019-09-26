import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Tasks from "./Tasks";

jest.mock("./Task/Task", () => "Task");

describe("Tasks", () => {
  let props: any;

  beforeEach(() => {
    props = {
      tasks: [
        {
          date: "2019-07-09T10:22:02.876Z",
          title: "GraphQL",
          isDone: false,
          pos: 3,
          _id: "5d246aee8e50ad0017f8c2ac",
          __v: 0
        },
        {
          date: "2019-09-23T05:18:31.813Z",
          title: "React",
          isDone: false,
          pos: 2,
          _id: "5d8855c8eb9ed00017e0a46c",
          __v: 0
        }
      ],
      handleDelete: jest.fn(),
      handleCrossOut: jest.fn(),
      // draggedTask: jest.fn(),
      onDrag: jest.fn(),
      onDrop: jest.fn()
    };
  });

  describe("render()", () => {
    it("renders a loading gif if empty tasks array", () => {
      props.tasks = [];
      const wrapper = shallow(<Tasks {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
                                                        <div
                                                          className="loader center-page loader--style1"
                                                          title="0"
                                                        >
                                                          <img
                                                            alt="loading gif"
                                                            src="loading.svg"
                                                          />
                                                        </div>
                                          `);
    });

    it("renders 2 tasks correctly", () => {
      const wrapper = renderer.create(<Tasks {...props} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <ul
          className="card"
        >
          <Task
            handleCrossOut={[MockFunction]}
            handleDelete={[MockFunction]}
            index={0}
            isDone={false}
            onDrag={[MockFunction]}
            onDrop={[MockFunction]}
            title="GraphQL"
          />
          <Task
            handleCrossOut={[MockFunction]}
            handleDelete={[MockFunction]}
            index={1}
            isDone={false}
            onDrag={[MockFunction]}
            onDrop={[MockFunction]}
            title="React"
          />
          <li
            className="card-task"
            id="last-index"
            onDrop={[Function]}
          >
            <span>
               
            </span>
          </li>
        </ul>
      `);
    });
  });
});
