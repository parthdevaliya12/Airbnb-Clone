import express from "express"
import isauth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"


const userRouter = express.Router()

userRouter.get('/currentuser',isauth,getCurrentUser)

export default userRouter