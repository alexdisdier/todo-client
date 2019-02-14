import React, { Component } from "react";
import axios from "axios";

import "./assets/css/reset.css";
import "./App.css";

import Header from "./components/Header";
import Tasks from "./components/Tasks/Tasks";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Footer from "./components/Footer";

import Loading from "./components/Loading/Loading";
import Error from "./components/Error/Error";

class App extends Component {
  state = {
    appTitle: "To do list",
    input: "",
    tasks: [],
    isLoading: true,
    error: null,
    onDragIndex: 0,
    onDropIndex: 0
  };

  renderError() {
    if (this.state.error !== null) {
      return <Error error={this.state.error} />;
    } else {
      return null;
    }
  }

  // Axios
  buildTasks = async () => {
    try {
      const response = await axios.get(
        `https://todo-server-alex.herokuapp.com/read`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const tasks = response.data;

      // Sort array of objects by a boolean property source: https://code.i-harness.com/en/q/1094fab
      tasks.sort(function(task, nextTask) {
        return task.isDone - nextTask.isDone;
      });
      // tasks.sort((task, nextTask) => task.isDone - nextTask.isDone);

      this.setState({
        tasks,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error: "An error occurred"
      });
    }
  };

  async componentDidMount() {
    const response = await this.buildTasks();
    return response;
  }

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
      title: this.state.input
    };

    this.setState({
      input: ""
    });

    axios
      .post(`https://todo-server-alex.herokuapp.com/create`, task, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.buildTasks();
      });
  };

  handleCrossOut = index => {
    const id = this.state.tasks[index]._id;
    axios
      .post(`https://todo-server-alex.herokuapp.com/update?id=${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.buildTasks();
      });
  };

  handleDelete = index => {
    const id = this.state.tasks[index]._id;
    axios
      .post(`https://todo-server-alex.herokuapp.com/delete?id=${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.buildTasks();
      });
  };

  onDrag = (event, index) => {
    event.preventDefault();
    this.setState({
      onDragIndex: index
    });
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDrop = async (event, index) => {
    let newArr = [...this.state.tasks];
    const itemDragged = newArr.splice(this.state.onDragIndex, 1);

    await this.setState({
      onDropIndex: index
    });

    newArr.splice(this.state.onDropIndex, 0, itemDragged[0]);
    this.setState({
      tasks: newArr
    });
  };

  renderTasks() {
    const { isLoading, error, tasks, draggedTask } = this.state;

    if (!isLoading && error === null) {
      return (
        <Tasks
          tasks={tasks}
          handleCrossOut={this.handleCrossOut}
          handleDelete={this.handleDelete}
          draggedTask={draggedTask}
          onDrag={this.onDrag}
          onDrop={this.onDrop}
        />
      );
    } else if (isLoading && error === null) {
      return <Loading />;
    } else {
      return null;
    }
  }

  render() {
    const { appTitle, input } = this.state;

    return (
      <div className="App">
        <Header title={appTitle} />

        {this.renderError()}

        <div
          className="card-container wrapper done"
          onDragOver={event => this.onDragOver(event)}
        >
          {this.renderTasks()}
        </div>

        <div className="wrapper">
          <form className="card" onSubmit={this.handleSubmit}>
            <Input
              name="input"
              value={input}
              handleChange={this.handleChange}
            />
            <div className="btn-add-container">
              <Button />
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
