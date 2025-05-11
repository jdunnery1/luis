import {connectDB} from "./lib/db.js";
import dotenv from "dotenv";
import express from 'express'
import cors from 'cors'
import * as path from "path";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cardRoute from "./routes/card.route.js";
import stripeRoute from "./routes/stripe.route.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT

const __dirname = path.resolve();

app.use(express.json({limit: '500mb'}))
app.use(express.urlencoded({limit: '500mb'}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/cards', cardRoute)
app.use('/api/stripe', stripeRoute)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get(/(.*)/, (req,res) => {
        res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
    connectDB()
})
