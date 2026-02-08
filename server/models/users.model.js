import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    listing:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing"
    }],
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookings"
    }],
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

export default userModel