import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Todo = props => (
  <tr>
      <td>{props.todo.description}</td>
      <td>{props.todo.responsible}</td>
      <td>{props.todo.priority}</td>
      <td>
          <Link to={`/edit/${props.todo._id}`} key={props.todo_id}>Edit</Link>
      </td>
  </tr>
)
class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos')
      .then(res => this.setState({
        todos: res.data
      }))
      .catch(err => console.log(err))
  }

  todoList = () => {
    return this.state.todos.map(function(todo, i) {
        return <Todo todo={todo} key={i} />;
    });
}

  render() {
    if(this.state.todos.length === 0) return <div>List is empty</div>
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Responsible</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                { this.todoList() }
            </tbody>
        </table>
    </div>
    )
  }
}

export default TodosList;