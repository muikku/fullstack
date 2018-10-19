const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('./testblog').testBlogs
const { nonExistingId, blogsInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjs = initialBlogs.map(blog => new Blog(blog).save())
  await Promise.all(blogObjs)
})

test('all notes are returned as json by GET /api/notes', async () => {
  const blogsInDatab = await blogsInDb()

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogsInDatab.length)

  const returnedTitles = response.body.map(n => n.title)
  blogsInDatab.forEach(blog => {
    expect(returnedTitles).toContain(blog.title)
  })
})

test('individual blogs are returned as json by GET /api/blogs:id', async () => {
  const blogInDatab = await blogsInDb()
  const aBlog = blogInDatab[0]

  const response = await api
    .get(`/api/blogs/${aBlog.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.author).toBe(aBlog.author)
})

test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
  const validNonexistingId = await nonExistingId()

  await api
    .get(`/api/blogs/${validNonexistingId}`)
    .expect(404)
})

test('400 returned with invalid id', async () => {
  const invalidId = '1238947987598'

  await api
    .get(`/api/blogs/${invalidId}`)
    .expect(400)
})

test('there are six blogs', async () => {
  const response = await api
    .get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
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
  expect(response.body.length).toBe(initialBlogs.length + 1)
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

describe('deletion of a blog', async() => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      author: 'getting deleted',
      title: 'so much removed',
      url: 'www.removeadds.com'
    })
    await addedBlog.save()
  })

  test('DELETE /api/notes/:id works with proper status', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOp = await blogsInDb()

    const authors = blogsAfterOp.map(e => e.author)

    expect(authors).not.toContain(addedBlog.author)
    expect(blogsAfterOp.length).toBe(blogsAtStart.length - 1)
  })
})

describe('PUT /api/blogs/:id', async () => {
  let existingBlog

  beforeAll(async () => {
    existingBlog = new Blog({
      author: 'vanha',
      title: 'vanha',
      url:'vanha'
    })
    await existingBlog
      .save()

  })
  test('Blog property has changed', async () => {
    const changedBlog = { author: 'uusi', title: 'uusi', url: 'uusi', likes: 9, _id: existingBlog._id }

    console.log('-------changedBlod id---- --', changedBlog)
      await api
      .put(`/api/blogs/${changedBlog._id}`)
      .send(changedBlog)
      .expect(201)

    const blogsAfter = await blogsInDb()
    const authors = blogsAfter.map(e => e.author)
     expect(authors).not.toContain('vanha')
     expect(authors).toContain('uusi')
  })
})

afterAll(() => {
  server.close()
})