import express from 'express'
import cors from 'cors'
import auth from './routes/auth.routes.js'
import morgan from 'morgan'
import contact from './routes/contact.routes.js'
import {verifytoken} from './middlewares/auth-verify.js'
import './db/db.js'

const app=express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(auth)
app.use('/contact',verifytoken,contact)


export default app;