const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware - intercepts messages and translates 
app.use(cors())
app.use(express.json())

// Mongoose connection
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message))

// Schema
const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
})

// Saves schema into database
const Post = mongoose.model('Post', postSchema)

// get all posts
app.get('/posts', async (req,res) => {
    const posts = await Post.find()
    res.send(posts)
})

// get one post
app.get('/posts/:id', async (req,res) => {
    const post = await Post.findById(req.params.id) // look inside params request 
    res.send(post)
})

// create new post
app.post('/posts', async (req,res) => {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.send(savedPost)
})

// deleta post
app.delete('/posts/:id', async(req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send('Post deleted')
})

app.listen(2025, () => console.log("Server started on post 2025"))