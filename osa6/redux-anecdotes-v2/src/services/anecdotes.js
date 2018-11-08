import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content })
  return response.data
}

const update = async (replacement) => {
  const response = await axios.put(`${url}/${replacement.id}`, replacement)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(id)
  return response.data
}

export default { getAll, createNew, update, remove }