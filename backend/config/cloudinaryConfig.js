import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryStreamUpload = (req) => {
  return new Promise((reject, resolve) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) reject(error);

        resolve(result);
      })
      .end(req.file.buffer);
  });
};
