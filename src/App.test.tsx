import React from "react";
import { shallow } from "enzyme";

import App from "./App";

jest.mock("./components/Header", () => "Header");
jest.mock("./components/Input/Input", () => "Input");
jest.mock("./components/Button/Button", () => "Button");
jest.mock("./components/Footer", () => "Footer");

describe("App", () => {
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
