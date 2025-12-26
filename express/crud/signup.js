import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './model/user.js'
import dotenv from 'dotenv'
dotenv.config()

const signup = express.Router()

signup.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already created" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { id: user._id, email: user.email },
            'process.env.JWT_SECRET',
            { expiresIn: '2d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 2 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            message: "user created successfully"

        })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

export default signup
