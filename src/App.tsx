import React, { Component, FormEvent, MouseEvent } from 'react';
import { nanoid } from 'nanoid';

import { TaskDefinition } from './types';

import './assets/css/reset.css';
import './App.css';

import Header from './components/Header';
import Tasks from './components/Tasks/Tasks';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Footer from './components/Footer';

import Error from './components/Error/Error';

const LOCALSTORAGE_KEY_TASKS = 'tasks';

interface IState {
    appTitle: string;
    input: string;
    tasks: TaskDefinition[];
    error: string;
    pos: number;
    onDragIndex: number;
    onDropIndex: number;
    loading: boolean;
}

class App extends Component<{}, IState> {
    state: IState = {
        appTitle: 'To do list',
        input: '',
        tasks: [],
        error: '',
        pos: 0,
        onDragIndex: 0,
        onDropIndex: 0,
        loading: false,
    };

    buildTasks = (): void => {
        const localStorageTasks = localStorage.getItem(LOCALSTORAGE_KEY_TASKS) || '';

        this.setState({
            tasks: JSON.parse(localStorageTasks) || [],
            loading: false,
        });
    };

    componentDidMount() {
        const localStorageTasks = localStorage.getItem(LOCALSTORAGE_KEY_TASKS) || '';

        if (localStorageTasks) {
            this.setState({
                tasks: JSON.parse(localStorageTasks) || [],
                loading: false,
            });
        }
    }

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        const { value }: any = event.target;
        this.setState({
            input: value,
        });
    };

    handleSubmit = (event: any): void => {
        const { tasks, input } = this.state;

        event.preventDefault();
        const lastIndex: number = tasks.length;
        const task = {
            key: nanoid(5),
            title: input,
            isDone: false,
            date: new Date(),
            pos: lastIndex + 1,
        } as TaskDefinition;

        const newTasks = [...tasks, task];

        localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(newTasks));

        this.setState({
            input: '',
            tasks: newTasks,
        });
    };

    /**
     * - toggles crossing out a task
     * - sorts the list by done task
     */
    handleCrossOut = (key: string): void => {
        const { tasks }: any = this.state;
        const newTasks: TaskDefinition[] = [...tasks];

        const taskToUpdate = newTasks.find(task => task.key === key);

        if (!taskToUpdate) return;

        taskToUpdate.isDone = !taskToUpdate.isDone;

        newTasks.sort((a, b) => {
            if (a.isDone === b.isDone) return 0;
            if (a.isDone) return -1;
            return 1;
        });

        localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(newTasks));

        this.setState({ tasks: newTasks });
    };

    handleDelete = (key: string) => {
        const { tasks }: any = this.state;

        const newTasks: TaskDefinition[] = [...tasks];

        const filteredTasks = newTasks.filter(task => task.key !== key);

        localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(filteredTasks));

        this.setState({ tasks: filteredTasks });
    };

    onDrag = (event: MouseEvent, index: number): void => {
        event.preventDefault();
        this.setState({
            onDragIndex: index,
        });
    };

    onDragOver = (event: MouseEvent) => {
        event.preventDefault();
    };

    onDrop = async (event: MouseEvent, index: string) => {
        // let newArr = [...this.state.tasks];
        // const itemDragged = newArr.splice(this.state.onDragIndex, 1);
        // await this.setState({
        //   onDropIndex: index
        // });
        // newArr.splice(this.state.onDropIndex, 0, itemDragged[0]);
        // this.setState({
        //   tasks: newArr
        // });
    };

    renderError() {
        if (this.state.error !== '') {
            return <Error error={this.state.error} />;
        } else {
            return null;
        }
    }

    renderTasks() {
        const { tasks, loading } = this.state;

        if (tasks.length === 0)
            return <div style={{ color: 'black' }}>Input your first task. It will only be saved in your browser</div>;

        return (
            <Tasks
                tasks={tasks}
                handleCrossOut={this.handleCrossOut}
                handleDelete={this.handleDelete}
                onDrag={this.onDrag}
                onDrop={this.onDrop}
                loading={loading}
            />
        );
    }

    render() {
        const { appTitle, input, tasks } = this.state;

        return (
            <div className="App">
                <Header title={appTitle} />

                {this.renderError()}

                <div
                    className="card-container wrapper done"
                    style={{
                        alignItems: `${tasks.length === 0 ? 'center' : 'unset'}`,
                        display: `${tasks.length === 0 ? 'flex' : 'unset'}`,
                    }}
                    onDragOver={this.onDragOver}
                >
                    {this.renderTasks()}
                </div>

                <div className="wrapper">
                    <form className="card" onSubmit={this.handleSubmit}>
                        <Input name="input" value={input} handleChange={this.handleChange} />
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
