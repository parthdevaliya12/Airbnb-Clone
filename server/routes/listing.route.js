// import express from "express";
// import isauth from "../middleware/isAuth.js";
// import upload from "../middleware/multer.js";
// import { addListing } from "../controllers/listing.controller.js";

// const listingRouter = express.Router();

// listingRouter.post(
//   "/add",
//   isauth,
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//   ]),
//   addListing,
// );

// export default listingRouter;

import express from "express";
import isauth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import {
  addListing,
  deleteListing,
  findListing,
  getListing,
  ratingListing,
  search,
  updateListing,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.post(
  "/add",
  isauth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addListing,
);

listingRouter.get("/get", getListing);
listingRouter.get("/findlistingbyid/:id", isauth, findListing);
listingRouter.delete('/deletelistingbyid/:id',isauth,deleteListing)
listingRouter.post('/rating/:id',isauth,ratingListing)
listingRouter.get('/search',search)

listingRouter.patch(
  "/update/:id",
  isauth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateListing,
);

export default listingRouter;
