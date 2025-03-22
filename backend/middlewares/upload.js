import multer from "multer";
import CustomError from "../utils/customError.js";

const storage = new multer.memoryStorage();

const filterImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new CustomError(400, "Please upload image only"), false);
  }
};

export const upload = multer({ storage });
export const uploadImage = multer({ storage, filterImage });
