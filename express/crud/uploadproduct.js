import express from 'express'
import uploadproduct from './model/product.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const postproduct = express.Router()


export default postproduct.post('/postproduct', async (req, res) => {
    try {

        const { name, price, description } = req.body

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })

        } else {
            const verify = jwt.verify(token, process.env.SECRET_KEY)
            if (!verify) {
                return res.status(401).json({ message: "unauthorized" })
            } else {
                try {
                    const product = await uploadproduct.create({
                        name, price, description
                    })
                    res.status(200).json({
                        message: "product uploaded successfully"
                    })
                } catch (err) {
                    res.status(500).json({
                        message: "something went wrong"
                    })
                }


            }
        }

    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

