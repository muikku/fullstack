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