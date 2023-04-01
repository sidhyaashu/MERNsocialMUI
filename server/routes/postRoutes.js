import express from 'express'
import { getFeedPosts , getUserPosts, likePost } from '../controllers/postsC.js'
import { veryFyToken } from '../middleware/AuthMiddleware.js'


const router = express.Router()


//READ
router.get('/',veryFyToken,getFeedPosts) //feed posts
router.get('/:userId/posts',getUserPosts) // indivisual post

//UPDATE
router.patch('/:id/like',veryFyToken,likePost)


export default router