import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    const { anecdoteCreation, notify, clear } = this.props
    e.preventDefault()
    anecdoteCreation(e.target.anecdote.value)
    notify(`${e.target.anecdote.value} created`)
    e.target.anecdote.value = ''
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
