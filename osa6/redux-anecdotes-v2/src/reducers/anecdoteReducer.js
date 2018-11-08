import anecdoteService from './../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const id = action.data.id
    const anecdoteToChange = store.find(a => a.id === id)
    const alteredAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    return store.map(a => a.id !== id ? a : alteredAnecdote)
  }
  if (action.type === 'CREATE') {

    return [...store, { ...action.data, votes: 0 }]
  }
  if(action.type === 'INIT_A'){
    console.log(action.data)
    return action.data
  }

  return store
}

export const anecdoteCreation = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })

  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_A',
      data: anecdotes
    })
  }
}

export default anecdoteReducer