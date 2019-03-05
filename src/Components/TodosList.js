import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Todo = props => (
  <tr>
      <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
      <td className={props.todo.completed ? 'completed' : ''}>{props.todo.responsible}</td>
      <td className={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
      <td>
          <Link to={"/edit/"+props.todo._id}>Edit</Link>
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
      .then(res => this.setState({todos: res.data}))
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/todos/')
    .then(response => {
        this.setState({todos: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })
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