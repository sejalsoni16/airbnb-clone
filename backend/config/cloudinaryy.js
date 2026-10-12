import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) {
    console.error("Cloudinary error: File path is missing");
    return null;
  }

  try {
    // Configure Cloudinary when the upload function runs
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Check configuration without printing credentials
    const config = cloudinary.config();

    if (!config.cloud_name || !config.api_key || !config.api_secret) {
      throw new Error("Cloudinary credentials are missing");
    }

    console.log("Uploading image:", filepath);

    const result = await cloudinary.uploader.upload(filepath);

    console.log("Image uploaded successfully:", result.secure_url);

    return result.secure_url;
  } catch (error) {
    console.error(
      "CLOUDINARY UPLOAD ERROR:",
      error.message
    );

    return null;
  } finally {
    // Remove the temporary file safely
    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
      } catch (error) {
        console.error("Temporary file cleanup error:", error.message);
      }
    }
  }
};

export default uploadOnCloudinary;