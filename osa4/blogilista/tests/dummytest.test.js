const listHelper = require('../utils/list_helper')
const blogs = require('../utils/testblog').testBlogs

test('dummy is called', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('total likes', () => {
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(36)
})

test('total likes but zero arrays', () => {
  const dummyblog = []
  const result = listHelper.totalLikes(dummyblog)
  expect(result).toBe(0)
})

test('favorite blog', () => {
  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual({ title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12 })
})

test('most blogs', () => {
  const result = listHelper.mostBlogs(blogs)
  expect(result).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
})

test('most likes', () => {
  const result = listHelper.mostLikes(blogs)
  expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 17 })
})


