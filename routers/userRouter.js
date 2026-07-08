import express from 'express'
import { createUser, loginUser } from '../controllers/userController.js' //controller eka import krnw

const userRouter = express.Router() //router ekk hadnn}

userRouter.post("/", createUser) //post request ekk hadnn, mehi "/create" kiynna path ekk wge thyna, mehi createUser function eka call krnw
userRouter.post("/login", loginUser) //login request ekk hadnn, 

export default userRouter