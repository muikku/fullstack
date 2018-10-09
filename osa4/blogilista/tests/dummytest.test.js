const listHelper = require('../utils/list_helper')
const blogs = require('../utils/testblog')


test('dummy is called', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})