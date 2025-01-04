import { Component } from "react";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const description = this.state.label;
      if (description) {
        this.props.taskAdd(description);
        this.setState({
          label: "",
        });
      }
    }
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          onKeyDown={this.handleKeyDown}
          onChange={this.onLabelChange}
          autoFocus
        />
      </header>
    );
  }
}
