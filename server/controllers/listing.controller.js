import uploadOnCloudinary from "../config/cloudinary.js";
import listingModel from "../models/listing.model.js";
import userModel from "../models/users.model.js";

// export const addListing = async (req, res) => {
//   try {
//     const host = req.userId
//     const {title,desc,rent,city,landMark,category} = req.body
//     const image1 = await uploadOnCloudinary(req.files.image1[0].path)
//     const image2 = await uploadOnCloudinary(req.files.image2[0].path)
//     const image3 = await uploadOnCloudinary(req.files.image3[0].path)

//     const listing = await listingModel.create({
//         title,desc,rent,city,landMark,category,image1,image2,image3,host
//     })
//     const user = await userModel.findByIdAndUpdate(host,{$push:{ listing:listing._id}},{new:true})
//     if(!user){
//             return res.status(400).json({message:"User not found"})

//     }
//     return res.status(200).json(listing)

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message:"Internal server error"})
//   }
// };

export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, desc, rent, city, landMark, category } = req.body;

    if (!req.files?.image1 || !req.files?.image2 || !req.files?.image3) {
      return res.status(400).json({ message: "All 3 images are required" });
    }

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    if (!image1 || !image2 || !image3) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const listing = await listingModel.create({
      title,
      desc,
      rent,
      city,
      landMark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    const user = await userModel.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true },
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    console.log("ADD LISTING ERROR =>", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await listingModel.find().sort({ createdAt: -1 });
    res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const findListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await listingModel.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const updateListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, desc, rent, city, landMark, category } = req.body;

//     if (!req.files?.image1 || !req.files?.image2 || !req.files?.image3) {
//       return res.status(400).json({ message: "All 3 images are required" });
//     }

//     const image1 = await uploadOnCloudinary(req.files.image1[0].path);
//     const image2 = await uploadOnCloudinary(req.files.image2[0].path);
//     const image3 = await uploadOnCloudinary(req.files.image3[0].path);

//     if (!image1 || !image2 || !image3) {
//       return res.status(400).json({ message: "Image upload failed" });
//     }

//     const listing = await listingModel.findByIdAndUpdate(
//       id,
//       {
//         title,
//         desc,
//         rent,
//         city,
//         landMark,
//         category,
//         image1,
//         image2,
//         image3,
//       },
//       { new: true },
//     );

//     return res.status(200).json(listing);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, rent, city, landMark, category } = req.body;

    const listing = await listingModel.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Default to old images
    let image1 = listing.image1;
    let image2 = listing.image2;
    let image3 = listing.image3;

    // Upload only if new files are provided
    if (req.files?.image1) {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if (req.files?.image2) {
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    if (req.files?.image3) {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    const updatedListing = await listingModel.findByIdAndUpdate(
      id,
      {
        title,
        desc,
        rent,
        city,
        landMark,
        category,
        image1,
        image2,
        image3,
      },
      { new: true },
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    console.log("UPDATE LISTING ERROR =>", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await listingModel.findByIdAndDelete(id);
    const user = await userModel.findByIdAndUpdate(
      listing.host,
      { $pull: { listing: listing._id } },
      { new: true },
    );
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const ratingListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const listing = await listingModel.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    // Calculate new average rating
    listing.ratings = Number(rating);
    await listing.save();
    return res
      .status(200)
      .json({
        message: "Rating submitted successfully",
        ratings: listing.ratings,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const search = async (req, res) => {
  try { 
    const { query } = req.query;
    if(!query){
      return res.status(400).json({message:"Query parameter is required"})
    }
    const listings = await listingModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },         
        { city: { $regex: query, $options: "i" } },
        { landMark: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json(listings);
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }

}