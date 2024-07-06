import { MongoClient, ObjectId, OptionalId, ServerApiVersion } from 'mongodb'
const uri = ''

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export async function fetchPosts(client: MongoClient) {
    await client.connect()
    const posts = client.db('blog').collection('posts')
    const result = await posts.find().toArray()
    await client.close()
    return result
}

export async function fetchPost(client: MongoClient, id: ObjectId) {
    await client.connect()
    const posts = client.db('blog').collection('posts')
    const result = await posts.findOne({ _id: id })
    await client.close()
    return result
}

export async function createPost(client: MongoClient, data: OptionalId<Document>) {
    await client.connect()
    const posts = client.db('blog').collection('posts')
    const result = await posts.insertOne(data)
    await client.close()
    return result
}

export async function updatePost(client: MongoClient, id: ObjectId, data: OptionalId<Document>) {
    await client.connect()
    const posts = client.db('blog').collection('posts')
    const result = await posts.updateOne({ _id: id }, { $set: data })
    await client.close()
    return result
}

export async function deletePost(client: MongoClient, id: ObjectId) {
    await client.connect()
    const posts = client.db('blog').collection('posts')
    const result = await posts.deleteOne({ _id: id })
    await client.close()
    return result
}
