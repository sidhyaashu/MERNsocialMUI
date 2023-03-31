import express from 'express'

import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from '../controllers/usersC.js'
import { veryFyToken } from '../middleware/AuthMiddleware.js'

const router = express.Router()

// READ
router.get("/:id",veryFyToken,getUser)
router.get("/:id/friends",veryFyToken,getUserFriends)

//UPDATE
router.patch("/:id/:friendId",veryFyToken,addRemoveFriends)

export default router