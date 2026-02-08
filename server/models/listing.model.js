import mongoose from "mongoose"
import users from "./users.model.js"


const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        require:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
     guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    image1:{
        type:String,
        required:true    
    },
    image2:{
        type:String,
        required:true    
    },
    image3:{
        type:String,
        required:true    
    },
    rent:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    ratings:{
        type:Number,
        default:0,
        min:0,
        max:5
    }

},{timestamps:true})

const listingModel = mongoose.model("listing",listingSchema)

export default listingModel