import React from "react";
import { shallow } from "enzyme";

import Tasks from "./Tasks";

jest.mock("./Task/Task", () => "Task");

describe("Tasks", () => {
  let props;

  beforeEach(() => {
    props = {
      tasks: [
        {
          title: "task1",
          isDone: false
        },
        {
          title: "task2",
          isDone: true
        }
      ],
      handleDelete: jest.fn(),
      handleCrossOut: jest.fn(),
      draggedTask: jest.fn(),
      onDrag: jest.fn(),
      onDrop: jest.fn()
    };
  });

  it("renders 2 tasks correctly", () => {
    const wrapper = shallow(<Tasks {...props} />);
    expect(wrapper).toMatchInlineSnapshot(`
      <tasks
        draggedTask={[MockFunction]}
        handleCrossOut={[MockFunction]}
        handleDelete={[MockFunction]}
        onDrag={[MockFunction]}
        onDrop={[MockFunction]}
        tasks={
          Array [
            Object {
              "isDone": false,
              "title": "task1",
            },
            Object {
              "isDone": true,
              "title": "task2",
            },
          ]
        }
      />
    `);
  });
});
