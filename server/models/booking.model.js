import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  host: {
    //owner of the listing
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  guest: {
    //person who booked the listing
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  listing: {
    //listing that is booked
    type: mongoose.Schema.Types.ObjectId,
    ref: "listing",
    required: true,
  },
  status:{
    type:String,
    enum:["booked","cancelled"],
    default:"booked"
  },
  checkIn:{
    type:Date,
    required:true
  },
  checkOut:{
    type:Date,
    required:true
  },
  totalRent:{
    type:Number,
    required:true
  },

},{timestamps:true});

const bookingModel = mongoose.model("bookings", bookingSchema);

export default bookingModel;
