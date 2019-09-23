import React from "react";
import axios from "axios";
import { shallow } from "enzyme";

/**
 * Unit tests should be run in isolation;
 * Thus we shouldn't make any external calls to the server.
 * Mocking axios module
 * makes unit tests independent of the network
 */
jest.mock("axios");

import App from "./App";

jest.mock("./components/Header", () => "Header");
jest.mock("./components/Input/Input", () => "Input");
jest.mock("./components/Button/Button", () => "Button");
jest.mock("./components/Footer", () => "Footer");

describe("App", () => {
  describe("api calls", () => {
    it("fetches offers on #componentDidMount", done => {
      const wrapper = shallow(<App />);
      expect(wrapper.state()).toHaveProperty("tasks", []);
      wrapper
        .instance()
        .componentDidMount()
        .then(() => {
          expect(axios.get).toHaveBeenCalled();
          expect(axios.get).toHaveBeenCalledWith(
            `https://todo-server-alex.herokuapp.com/read`,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          expect(wrapper.state()).toHaveProperty("tasks", [
            {
              __v: 0,
              _id: "5d246aee8e50ad0017f8c2ac",
              date: "2019-07-09T10:22:02.876Z",
              isDone: false,
              pos: 3,
              title: "GraphQL"
            },
            {
              __v: 0,
              _id: "5d8855c8eb9ed00017e0a46c",
              date: "2019-09-23T05:18:31.813Z",
              isDone: false,
              pos: 2,
              title: "React"
            }
          ]);

          const spyOnBuildTasks = jest.spyOn(wrapper.instance(), "buildTasks");

          wrapper.instance().forceUpdate();
          wrapper.instance().buildTasks(1);

          expect(spyOnBuildTasks).toHaveBeenCalledTimes(1);
          expect(spyOnBuildTasks).toHaveBeenCalledWith(1);

          done();
        });
    });
  });

  it("renders the App correctly", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="App"
      >
        <Header
          title="To do list"
        />
        <div
          className="card-container wrapper done"
          onDragOver={[Function]}
        >
          <withLoading
            handleCrossOut={[Function]}
            handleDelete={[Function]}
            onDrag={[Function]}
            onDrop={[Function]}
            tasks={Array []}
          />
        </div>
        <div
          className="wrapper"
        >
          <form
            className="card"
            onSubmit={[Function]}
          >
            <Input
              handleChange={[Function]}
              name="input"
              value=""
            />
            <div
              className="btn-add-container"
            >
              <Button />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    `);
  });
});
