import express from "express";
import isauth from "../middleware/isAuth.js";
import { cancleBooking, createBooking } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();


bookingRouter.post('/create/:id',isauth,createBooking)
bookingRouter.delete('/delete/:id',isauth,cancleBooking)

export default bookingRouter;