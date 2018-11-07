import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    const { anecdoteCreation, notify, clear } = this.props
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    anecdoteCreation(newAnecdote)
    notify(`${newAnecdote.content} created`)
    setTimeout(() => {
      clear()
    }, 5000)
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    anecdote: state.anecdote
  }
}

const ConnectedAnecdoteForm = connect(mapStateToProps, { anecdoteCreation, notify, clear })(AnecdoteForm)

export default ConnectedAnecdoteForm
