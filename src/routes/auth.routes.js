import express from 'express'
import {loginController,registerController} from '../controllers/auth.controller.js'
const routes=express.Router()


routes.post('/register',registerController)
routes.post('/login',loginController)

export default routes;