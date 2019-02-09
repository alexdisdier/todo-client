import React, { Component } from "react";
import "./assets/css/reset.css";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    appTitle: "To do list",
    input: "",
    tasks: [
      {
        text: "test 1",
        crossOut: false
      },
      {
        text: "test 2",
        crossOut: false
      },
      {
        text: "test 3",
        crossOut: false
      }
    ],
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
    const task = {
      text: this.state.input,
      crossOut: false
    };
    const tasks = [...this.state.tasks];
    tasks.push(task);
    this.setState({
      input: "",
      tasks: tasks
    });
  };

  handleCrossOut = text => {
    const updateTasks = [...this.state.tasks];
    for (let i = 0; i < updateTasks.length; i++) {
      if (updateTasks[i].text === text) {
        updateTasks[i].crossOut = !updateTasks[i].crossOut;
      }
    }

    this.setState({
      tasks: updateTasks
    });
  };

  handleDelete = text => {
    const updateTasks = [];
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].text !== text) {
        updateTasks.push(this.state.tasks[i]);
      }
    }
    this.setState({
      tasks: updateTasks
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
                <span onClick={() => this.handleDelete(item.text)}>X</span>
                <span
                  id={index}
                  className={item.crossOut ? "cross-task" : ""}
                  onClick={() => this.handleCrossOut(item.text)}
                >
                  {item.text}
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
