import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'
import Anecdote from './Anecdote'

class AnecdoteList extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => 
        this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    voteAnecdote = (id) => () => {
        this.context.store.dispatch(
            actionFor.vote(id)
        )
    }
    render(){
        return(
            <div>
                <h2>Anecdotes</h2>
                {this.context.store.getState().sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={this.voteAnecdote(anecdote.id)}
                    />
                )}
            </div>
        )
    }
}


AnecdoteList.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteList