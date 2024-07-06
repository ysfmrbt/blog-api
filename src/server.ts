import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { client, fetchPosts, createPost, fetchPost, updatePost, deletePost } from "./mongo"
import { ObjectId } from 'mongodb'
const app = new Hono()

const route = app.get('/test', (c) => {
  return c.json({ message: `I'm alive!` })
})

app.get('/posts', async (c) => {
  const result = await fetchPosts(client)
  return c.json({ message: result })
})

app.get('/posts/:id', async (c) => {
  const id = new ObjectId(c.req.param('id'))
  const result = await fetchPost(client, id)
  return c.json({ message: result })
})

app.post('/posts', async (c) => {
  const result = await createPost(client, await c.req.json())
  if (result.acknowledged) {
    return c.json({ message: `Post created` })
  }
  return c.json({ message: `Post was not created` })
})

app.put('/posts/:id', async (c) => {
  const id = new ObjectId(c.req.param('id'))
  const result = await updatePost(client, id, await c.req.json())
  if (result.acknowledged) {
    return c.json({ message: `Post updated` })
  }
  return c.json({ message: `Post was not updated` })
})

app.delete('/posts/:id', async (c) => {
  const id = new ObjectId(c.req.param('id'))
  const result = await deletePost(client, id)
  if (result.acknowledged) {
    return c.json({ message: `Post deleted` })
  }
  return c.json({ message: `Post was not deleted` })
})



const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
