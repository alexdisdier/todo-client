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
    error: null
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
      await axios
        .get(`https://todo-server-alex.herokuapp.com/read`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          const tasks = res.data;
          this.setState({
            tasks,
            isLoading: false
          });
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

  renderTasks() {
    if (!this.state.isLoading && this.state.error === null) {
      return (
        <Tasks
          tasks={this.state.tasks}
          handleCrossOut={this.handleCrossOut}
          handleDelete={this.handleDelete}
        />
      );
    } else if (this.state.isLoading && this.state.error === null) {
      return <Loading />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="App">
        <Header title={this.state.appTitle} />

        {this.renderError()}

        <div className="card-container wrapper">{this.renderTasks()}</div>

        <div className="wrapper">
          <form className="card" onSubmit={this.handleSubmit}>
            <Input
              name="input"
              value={this.state.input}
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
