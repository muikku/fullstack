import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { notify, clear } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleClick = (anecdote) => () => {
    const { anecdoteVote, notify, clear } = this.props
    return(
      anecdoteVote(anecdote.id),
      notify(`liked ${anecdote.content}`),
      setTimeout(() => {
        clear()
      }, 5000)
    )
  }

  render() {
    const { anecdotes, filter } = this.props

    const anecdoteList = anecdotes
      .sort((a, b) => b.votes - a.votes)

    const showAllOrFilter = filter === 'ALL' ?
      anecdoteList :
      anecdoteList
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter/>
        {showAllOrFilter.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={this.handleClick(anecdote)}
          />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { notify, clear, anecdoteVote })(AnecdoteList)

export default ConnectedAnecdoteList
