import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <Filter/>
    {props.showAnecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={
          () => {
            props.anecdoteVote(anecdote)
            props.notify(`liked ${anecdote.content}`, 5)
          }
        }
      />)}
  </div>
)



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

export default connect(
  mapStateToProps,
  { notify, anecdoteVote }
)(AnecdoteList)
