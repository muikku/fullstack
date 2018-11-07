import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { notify, clear } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

class AnecdoteList extends React.Component {
  handleClick = (anecdote) => async () => {
    const { anecdoteVote, notify, clear } = this.props
    const votedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 }, anecdote.id)
    return(
      votedAnecdote,
      anecdoteVote(anecdote.id),
      notify(`liked ${anecdote.content}`),
      setTimeout(() => {
        clear()
      }, 5000)
    )
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter/>
        {this.props.showAnecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={this.handleClick(anecdote)}
          />)}
      </div>
    )
  }
}

const anecdoteToShow = (anecdotes, filter) => {
  const anecdoteList = anecdotes
    .sort((a, b) => b.votes - a.votes)
  const showAllOrFilter = filter === 'ALL' ?
    anecdoteList :
    anecdoteList
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return showAllOrFilter
}

const mapStateToProps = (state) => {
  return {
    showAnecdotes: anecdoteToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { notify, clear, anecdoteVote })(AnecdoteList)

export default ConnectedAnecdoteList
