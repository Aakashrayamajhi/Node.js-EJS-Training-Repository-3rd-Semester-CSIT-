const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'about.html'))
});

app.get('/login', (req, res) => {

    const { username, password } = req.query
    const data = `username: ${username}  password: ${password}`
    fs.appendFileSync('login.txt', data)
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))
})




const port = 3001
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})