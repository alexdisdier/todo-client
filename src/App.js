import React, { Component } from "react";
import "./assets/css/reset.css";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    appTitle: "To do list",
    tasks: ["test1", "test2", "test3", "test4"]
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.appTitle} />

        <div className="card-container wrapper">
          <ul className="card">
            {this.state.tasks.map(item => (
              <li className="card-item">
                <span>X</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="btn-add-container wrapper">
          <button className="btn-add">
            <span>+</span>
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
