import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"

dotenv.config()



const port = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(cookieParser())


app.use(
    cors({
        origin: "https://esvio.vercel.app",
        credentials: true,
    }),
);

//router
app.use('/auth', authRouter)
app.use('/user',userRouter)
app.use('/listing',listingRouter)
app.use('/booking',bookingRouter)


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
     connectDB()
})
