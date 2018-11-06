
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  default:
    return state
  }
}

export const setFilter = (string) => {
  return (
    {
      type: 'SET_FILTER',
      filter: string
    }
  )
}

export const unfilter = () => {
  return (
    {
      type: 'SET_FILTER',
      filter: 'ALL'
    }
  )
}

export default filterReducer