
const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
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

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_A',
    data
  }
}

export default anecdoteReducer