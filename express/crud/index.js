import express from 'express'
import dbconnection from './dbconnection.js'
import signup from './signup.js'
import login from './login.js'
import dotenv from 'dotenv'
import postproduct from './uploadproduct.js'
import { fromJSON } from 'postcss'
dotenv.config()

const app = express()
const port = process.env.port

dbconnection

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(signup)
app.use(login)
app.use(postproduct)



app.listen(port, () => {
    console.log(`running at http://localhost:${process.env.port}`)
})