const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove()

    const blogObjects = initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  describe('addition of a new blog', async () => {

    test('a valid blog can be added', async () => {
      const blogsAtStart = await blogsInDb()

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

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

      const titles = blogsAfterOperation.map(b => b.title)
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

      const blogsAfterOperation = await blogsInDb()

      const addedBlog = blogsAfterOperation.find(r => r.title === 'Likes value missing')

      expect(addedBlog.likes).toBe(0)
    })

    test('missing title will return 400 Bad request', async () => {
      const newBlog = {
        author: "Urmeli",
        url: "www.xx.aa",
        likes: 10
      }

      const blogsAtStart = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    test('missing url will return 400 Bad request', async () => {
      const newBlog = {
        title: "url missing",
        author: "Urmeli",
        likes: 10
      }

      const blogsAtStart = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
  })

  describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
      addedBlog = new Blog({
        title: "Blog nr 6",
        author: "Urmeli",
        url: "www.xx.aa",
        likes: 4
      })
      await addedBlog.save()
    })

    test('DELETE /api/notes/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDb()

      await api
        .delete(`/api/blogs/${addedBlog._id}`)
        .expect(204)

      const blogsAfter = await blogsInDb()
      const titles = blogsAfter.map(r => r.title)

      expect(titles).not.toContain(addedBlog.title)
      expect(blogsAfter.length).toBe(blogsAtStart.length - 1)
    })
  })

  describe('updating a blog', async () => {

    test('PUT /api/notes/:id succeeds with proper statuscode and likes value only changed', async () => {
      const blogsAtStart = await blogsInDb()
      const blog = blogsAtStart[0]

      const updates = {
        "title": blog.title,
        "author": blog.author,
        "url": blog.url,
        "likes": 100
      }

      await api
        .put(`/api/blogs/${blog.id}`)
        .send(updates)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await blogsInDb()
      const updatedBlog = blogsAfter.map(r => r.title === blog.title)

      expect(blog.likes).not.toContain(updatedBlog.likes)
    })
  })
})
afterAll(() => {
  server.close()
})