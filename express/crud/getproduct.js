import express from "express"
import jwt from 'jsonwebtoken'
import uploadproduct from './model/product.js'
import dotenv from 'dotenv'
dotenv.config()

const getproduct = express.Router()

export default getproduct.get('/getproduct', async (req, res) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "unauthorized" })
        } else {
            const verify = jwt.verify(token, process.env.SECRET_KEY)
            if (!verify) {
                return res.status(401).json({ message: "unauthorized" })
            } else {
                const product = await uploadproduct.find()

                res.status(200).json(
                    {
                        message: "product fetched successfully",
                        product
                    }
                )
            }
        }
    }

    catch (err) {
        res.status(500).json({
            message: "something went wrong",
        })

    }
})