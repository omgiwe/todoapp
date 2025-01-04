import { Component } from "react";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

export default class App extends Component {
  state = {
    todos: [
      { id: "1", body: "Completed task", checked: false },
      { id: "2", body: "Editing task", checked: false },
      { id: "3", body: "Active task", checked: false },
    ],
    filter: "All",
  };

  taskId = 10;

  taskCompleted = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      ),
    }));
  };

  taskDelete = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((task) => task.id !== id),
    }));
  };

  taskAdd = (description) => {
    const newTask = {
      id: this.taskId++,
      body: description,
      checked: false,
    };

    this.setState(({ todos }) => ({
      todos: [...todos, newTask],
    }));
  };

  activTasks = () => {
    return this.state.todos.filter(({ checked }) => checked === false).length;
  };

  clearCompletedTasks = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((elem) => elem.checked === false),
    }));
  };

  TaskFiltered = () => {
    const { todos, filter } = this.state;
    return todos.filter(({ checked }) => {
      const all = filter === "All";
      const completed = filter === "Completed";
      return all ? true : completed ? checked === true : checked === false;
    });
  };

  changeFilter = (value) => {
    this.setState({ filter: value });
  };

  render() {
    // const { todos } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm taskAdd={this.taskAdd} />
        <section className="main">
          <TaskList
            todos={this.TaskFiltered()}
            taskCompleted={this.taskCompleted}
            taskDelete={this.taskDelete}
          />
          <Footer
            activTasks={this.activTasks()}
            clearCompletedTasks={this.clearCompletedTasks}
            changeFilter={this.changeFilter}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
