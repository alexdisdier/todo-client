import React from "react";
import axios from "axios";
import { shallow } from "enzyme";
import App from "./App";

/**
 * Unit tests should be run in isolation;
 * Thus we shouldn't make any external calls to the server.
 * Mocking axios module
 * makes unit tests independent of the network
 */
jest.mock("axios");

jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "nanoid")
}));


jest
  .spyOn(global.Date, "now")
  .mockImplementationOnce(() => new Date("2019-05-14T11:01:58.135Z").valueOf());

jest.mock("./components/Header", () => "Header");
jest.mock("./components/Input/Input", () => "Input");
jest.mock("./components/Button/Button", () => "Button");
jest.mock("./components/Footer", () => "Footer");

jest.mock("./components/Error/Error", () => "Error");

describe("App", () => {
  describe("render()", () => {
    it("renders an error", () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ error: "error" });

      expect(wrapper.find("Error")).toMatchInlineSnapshot(`
                <Error
                  error="error"
                />
            `);
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
            style={
              Object {
                "alignItems": "center",
                "display": "flex",
              }
            }
          >
            <div
              style={
                Object {
                  "color": "black",
                }
              }
            >
              Input your first task. It will only be saved in your browser
            </div>
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
});
