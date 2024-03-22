import multer from "multer";
import { UploadPath } from "../../enums/uploadPath";

require("dotenv").config();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UploadPath.SIGNS);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadSign = multer({ storage });

export default uploadSign;
