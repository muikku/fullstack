import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class CreateNew extends React.Component {
    constructor() {
      super()
      this.state = {
        content: '',
        author: '',
        info: ''
      }
    }
  
    handleChange = (e) => {
      console.log(e.target.name, e.target.value)
      this.setState({ [e.target.name]: e.target.value })
    }
  
    handleSubmit = (e) => {
      e.preventDefault()
      this.props.addNew({
        content: this.state.content,
        author: this.state.author,
        info: this.state.info,
        votes: 0
      })
      this.props.notify(`a new anecdote ${this.state.content} created!`)
      this.props.history.push('/anecdotes')
    }
  
    render() {
      return(
  
    <div className="ui inverted form">
          <h2>create a new anecdote</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>content</label>
              <input
              type="text"
            name='content'
            value={this.state.content}
            onChange={this.handleChange}
            />
            </Form.Field>
            <Form.Field>
              <label>author</label>
              <input
              type="text"
            name='author'
            value={this.state.author}
            onChange={this.handleChange}
            />
            </Form.Field>
            <Form.Field>
              <label>url for more info</label>
              <input
              type="text"
            name='info'
            value={this.state.info}
            onChange={this.handleChange}
            />
            </Form.Field>
            <Button type="submit">create</Button>
          </Form>&nbsp;
        </div>     
        )
  
    }
  }

  export default CreateNew