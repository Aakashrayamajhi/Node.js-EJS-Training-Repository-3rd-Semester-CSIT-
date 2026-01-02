import express from 'express'
import dbconnection from './dbconnection.js'
import signup from './signup.js'
import login from './login.js'
import dotenv from 'dotenv'
import postproduct from './uploadproduct.js'
import getproduct from './getproduct.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.port

dbconnection

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(signup)
app.use(login)
app.use(postproduct)
app.use(getproduct)

app.listen(port, () => {
    console.log(`running at http://localhost:${process.env.port}`)
})