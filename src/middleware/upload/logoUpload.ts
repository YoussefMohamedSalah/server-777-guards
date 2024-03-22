import multer from "multer";
import { UploadPath } from "../../enums/uploadPath";

require("dotenv").config();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UploadPath.LOGO);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be unique
  },
});

const uploadLogo = multer({ storage });

export default uploadLogo;
