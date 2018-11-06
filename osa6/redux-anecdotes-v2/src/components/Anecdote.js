import React from 'react'

const Ancedote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote
        </button>
      </div>
    </div>
  )
}

export default Ancedote
