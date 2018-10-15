const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('../utils/testblog')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjs = initialBlogs.testBlogs.map(blog => new Blog(blog).save())
  await Promise.all(blogObjs)
})

test('blogs return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api
    .get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.testBlogs.length)
})


test('post it', async () => {
  const newBlog = {
    title: 'patterns',
    author: 'Chan',
    url: 'nice url here',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(initialBlogs.testBlogs.length + 1)
  expect(titles).toContain('patterns')
})

test('no value is zero', async () => {
  const newBlog = {
    title: 'less defiend',
    author: 'anon',
    url: 'unknown origin',
    likes: undefined
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api
    .get('/api/blogs')

  const likes = response.body.find(e => e.author === newBlog.author).likes
  expect(likes).toBe(0)
})

test('title missing', async () => {
  const newBlog = {
    title: undefined,
    author: 'anon28',
    url: NaN,
    likes: undefined
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  expect(response.body.includes('anon28')).toBe(false)
})

afterAll(() => {
  server.close()
})