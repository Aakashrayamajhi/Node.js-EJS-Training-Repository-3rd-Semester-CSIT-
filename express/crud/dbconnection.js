import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()


export default mongoose.connect(process.env.mongodb_url)
    .then(() => { console.log('connected to db') })
    .catch((err) => { console.log(err) })


