const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Miisa",
    url: "www.xx.aa",
    likes: 5
  },
  {
    title: "Blog 2",
    author: "Irmeli",
    url: "www.xx.aa",
    likes: 10
  }
]

beforeAll(async () => {
  await Blog.remove({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Blog 3 added",
    author: "Urmeli",
    url: "www.xx.aa",
    likes: 12
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
  expect(titles).toContain('Blog 3 added')
})

test('likes value will be zero if the value is missing', async () => {
  const newBlog = {
    title: "Likes value missing",
    author: "Urmeli",
    url: "www.xx.aa"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const addedBlog = response.body.find(r => r.title === 'Likes value missing')

  expect(addedBlog.likes).toBe(0)
})

test('missing title will return 400 Bad request', async () => {
  const newBlog = {
    author: "Urmeli",
    url: "www.xx.aa",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('missing url will return 400 Bad request', async () => {
  const newBlog = {
    title: "url missing",
    author: "Urmeli",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  server.close()
})