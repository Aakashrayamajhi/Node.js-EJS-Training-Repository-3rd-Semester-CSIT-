import express from 'express'
import User from './model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const login = express.Router()

login.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }


        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }


        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 2 * 24 * 60 * 60 * 1000
        })


        res.status(200).json({
            message: "User logged in successfully",
            user: { id: user._id, email: user.email },
            token
        })

    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ message: "Server error" })
    }
})

export default login
