import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY
});

const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const result = await cloudinary.uploader.upload(filepath, {
      folder: "estatex",
      resource_type: "image",
    });

    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    return result.secure_url;
  } catch (error) {
    console.log("CLOUDINARY ERROR =>", error.message);

    if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);

    return null;
  }
};

export default uploadOnCloudinary;
