import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`http://localhost:4000/todos/${params.id}`)
      .then(res => {
        this.setState({
          description: res.data.description,
          responsible: res.data.responsible,
          priority: res.data.priority,
          completed: res.data.completed,
          _id: res.data._id
        })
      })
      .catch(err => console.log(err))
  }

  handleChange = (event) => {
    const {target} = event
    const {value, name} = target
    this.setState({
      [name]: value
    });
  }
  onChangeTodoCompleted = (e) => {
    this.setState({
        completed: !this.state.completed
    });
}
  onSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:4000/todos/update/${this.state._id}`, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    this.props.history.push('/');
  }

  render() {
    const {description, responsible, priority, completed} = this.state
    return (
      <div style={{marginTop: 20}}>
        <h3>Create new Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Description:</label>
            <input type='text' className='form-control' name='description' value={description} onChange={this.handleChange}/>
            <label>Responsible:</label>
            <input type='text' className='form-control' name='responsible' value={responsible} onChange={this.handleChange}/>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityLow"
                  value="Low"
                  checked={priority==='Low'}
                  onChange={this.handleChange}
                  />
                <label className="form-check-label">Low</label>
              </div>
              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityMedium"
                  value="Medium"
                  checked={priority==='Medium'}
                  onChange={this.handleChange}
                  />
                <label className="form-check-label">Medium</label>
              </div>
              <div className="form-check form-check-inline">
                <input  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityHigh"
                  value="High"
                  checked={priority==='High'}
                  onChange={this.handleChange}
                  />
                <label className="form-check-label">High</label>
              </div>
              <div className="form-check">
                <input  type="checkbox"
                  className="form-check-input"
                  id="completedCheckbox"
                  name="completed"
                  onChange={this.onChangeTodoCompleted}
                  checked={completed}
                  value={completed}
                  />
                <label className="form-check-label" htmlFor="completedCheckbox">
                  Completed
                </label>
            </div>
          </div>

          </div>
          <div className='form-group'>
            <input type='submit' value='Create Todo' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

export default EditTodo;