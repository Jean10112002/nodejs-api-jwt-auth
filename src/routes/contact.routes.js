import express from 'express'
import {getContact} from '../controllers/contact.controller.js'
const routes=express.Router()


routes.post('/',getContact)

export default routes;