import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const { anecdoteCreation, notify } = this.props
    const newAnecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    anecdoteCreation(newAnecdote)

    notify(`${newAnecdote} created`, 5)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, notify }
)(AnecdoteForm)
