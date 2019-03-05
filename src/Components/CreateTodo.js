import React, { Component } from 'react';
const INITIAL_STATE = {
  description: '',
  responsible: '',
  priority: '',
  completed: false
}
class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
  }
  handleChange = (event) => {
    const {target} = event
    const {value, name} = target
    this.setState({
      [name]: value
    });
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      INITIAL_STATE
    })
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

export default CreateTodo;