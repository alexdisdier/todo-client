import * as React from "react";
import axios from "axios";

import "./assets/css/reset.css";
import "./App.css";

import domain from "./assets/domain.js";
import Header from "./components/Header";
import Tasks from "./components/Tasks/Tasks";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Footer from "./components/Footer";

import Error from "./components/Error/Error";

interface IState {
  appTitle: string;
  input: string;
  tasks: [];
  // draggedTask: [];
  error: string;
  pos: number;
  onDragIndex: number;
  onDropIndex: number;
  loading: boolean;
}

class App extends React.Component<{}, IState> {
  state: IState = {
    appTitle: "To do list",
    input: "",
    tasks: [],
    // draggedTask: [],
    error: "",
    pos: 0,
    onDragIndex: 0,
    onDropIndex: 0,
    loading: true
  };

  buildTasks = async () => {
    try {
      const response = await axios.get(`${domain}/read`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const tasks = response.data;

      // Sort array of objects by a boolean property source: https://code.i-harness.com/en/q/1094fab
      tasks.sort((task: any, nextTask: any) => task.isDone - nextTask.isDone);

      this.setState({
        tasks,
        loading: false
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

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value }: any = event.target;
    this.setState({
      input: value
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const lastIndex: number = this.state.tasks.length;
    const task: Object = {
      title: this.state.input,
      pos: lastIndex + 1
    };

    this.setState({
      input: ""
    });

    axios
      .post(`${domain}/create`, task, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.buildTasks();
      });
  };

  handleCrossOut = (index: number) => {
    const { tasks }: any = this.state;
    const id = tasks[index]._id;

    axios
      .post(`${domain}/update?id=${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.buildTasks();
      });
  };

  handleDelete = (index: number) => {
    const { tasks }: any = this.state;
    const id = tasks[index]._id;

    axios
      .post(`${domain}/delete?id=${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.buildTasks();
      });
  };

  onDrag = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    this.setState({
      onDragIndex: index
    });
  };

  onDragOver = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  onDrop = async (event: React.MouseEvent, index: number) => {
    let newArr = [...this.state.tasks];

    const itemDragged = newArr.splice(this.state.onDragIndex, 1);

    await this.setState({
      onDropIndex: index
    });

    newArr.splice(this.state.onDropIndex, 0, itemDragged[0]);
    // this.setState({
    //   tasks: newArr
    // });
  };

  renderError() {
    if (this.state.error !== "") {
      return <Error error={this.state.error} />;
    } else {
      return null;
    }
  }

  renderTasks() {
    const { tasks, loading } = this.state;

    return (
      <Tasks
        tasks={tasks}
        handleCrossOut={this.handleCrossOut}
        handleDelete={this.handleDelete}
        // draggedTask={draggedTask}
        onDrag={this.onDrag}
        onDrop={this.onDrop}
        loading={loading}
      />
    );
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
