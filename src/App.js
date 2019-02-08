import React, { Component } from "react";
import "./assets/css/reset.css";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    appTitle: "To do list",
    input: "",
    tasks: ["test 1", "test 2", "test 3"],
    tasksDone: [],
    delete: false
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const update = {};
    update[name] = value;
    this.setState(update);
  };

  handleSubmit = event => {
    event.preventDefault();
    const task = this.state.input;
    const tasks = [...this.state.tasks];
    tasks.push(task);
    this.setState({
      tasks: tasks
    });
  };

  handleCrossOut = id => {
    const element = document.getElementById(id);
    element.classList.toggle("cross-task");
    if (element.classList.contains("cross-task")) {
      this.setState({
        tasksDone: [...this.state.tasksDone, element.innerText]
      });
    }
  };

  handleDelete = id => {
    const tasks = [...this.state.tasks];
    tasks.splice(id, 1);
    this.setState({
      tasks: tasks
    });
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.appTitle} />

        <div className="card-container wrapper">
          <ul className="card">
            {this.state.tasks.map((item, index) => (
              <li key={index} className="card-item">
                <span onClick={() => this.handleDelete(index)}>X</span>
                <span id={index} onClick={() => this.handleCrossOut(index)}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form className="wrapper" onSubmit={this.handleSubmit}>
          <input
            className="card-item"
            placeholder="type some text here"
            type="text"
            name="input"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <div className="btn-add-container">
            <button className="btn-add" value="submit">
              <span>+</span>
            </button>
          </div>
        </form>

        <Footer />
      </div>
    );
  }
}

export default App;

// handleCrossOut = id => {
//   const tasks = [...this.state.tasks];
//   const element = document.getElementById(id);
//   const innerEle = element.innerText;
//   let endArr = "";
//   element.classList.toggle("cross-task");
//   if (element.classList.contains("cross-task")) {
//     if (tasks.includes(innerEle)) {
//       endArr = tasks.splice(tasks.indexOf(innerEle), 1).join("");
//       this.setState({
//         tasks: [...tasks, endArr]
//       });
//     }
//   }
// };
