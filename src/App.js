import React, { Component } from "react";
import axios from "axios";
import "./assets/css/reset.css";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Item from "./components/Item/Item";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    appTitle: "To do list",
    input: "",
    tasks: [
      // {
      //   title: "test 1",
      //   crossOut: false
      // },
      // {
      //   title: "test 2",
      //   crossOut: false
      // },
      // {
      //   title: "test 3",
      //   crossOut: false
      // }
    ]
  };

  // Axios
  buildTasks = () => {
    axios
      .get(`https://todo-server-alex.herokuapp.com/read`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      });
  };

  deleteTasks = () => {};

  componentDidMount() {
    this.buildTasks();
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
      // crossOut: false
    };
    // const tasks = [...this.state.tasks, task];

    this.setState({
      input: ""
      // tasks: tasks
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
    const updateTasks = [...this.state.tasks];
    updateTasks[index].crossOut = !updateTasks[index].crossOut;

    this.setState({
      tasks: updateTasks
    });
  };

  handleDelete = index => {
    // const updateTasks = [];
    // for (let i = 0; i < this.state.tasks.length; i++) {
    //   if (i !== index) {
    //     updateTasks.push(this.state.tasks[i]);
    //   }
    // }
    // this.setState({
    //   tasks: updateTasks
    // });
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

  render() {
    return (
      <div className="App">
        <Header title={this.state.appTitle} />

        <div className="card-container wrapper">
          <ul className="card">
            {this.state.tasks.map((item, index) => (
              <Item
                key={index}
                handleDelete={this.handleDelete}
                handleCrossOut={this.handleCrossOut}
                title={item.title}
                index={index}
                crossOut={item.crossOut}
              />
            ))}
          </ul>
        </div>

        <form className="wrapper" onSubmit={this.handleSubmit}>
          <Input
            name="input"
            value={this.state.input}
            handleChange={this.handleChange}
          />
          <div className="btn-add-container">
            <Button />
          </div>
        </form>

        <Footer />
      </div>
    );
  }
}

export default App;
