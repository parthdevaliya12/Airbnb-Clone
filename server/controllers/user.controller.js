import userModel from "../models/users.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("-password")
      .populate(
        "listing",
        "title desc city category landMark rent image1 image2 image3 isBooked host ratings",
      )
      .populate({
        path: "booking",
        populate: {
          path: "listing",
          select: "title desc city category landMark rent image1 image2 image3 isBooked host ratings",
        },
      });
    if (!user) {
      return res.status(400).json({ message: "User dose not exits" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

