import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  console.log(response.data)
  return response.data
} ////token? user? id

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getUserBlogs = async () => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = await axios.get('/api/user', config)
  return request.data
}

const commentBlog = async (comments) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = await axios.post(`/api/blogs/${comments.blogId}/comments`, comments, config)
  return request.data
}

const getComments = async () => {
  const request = await axios.get('/api/blogs/all/comments')
  return request.data
}

export default { getAll, create, update, setToken, remove, getUserBlogs, commentBlog, getComments }