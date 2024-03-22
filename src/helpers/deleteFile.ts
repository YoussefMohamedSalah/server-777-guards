import fs from "fs";
import path from "path";

export const deleteFile = (fileName: string) => {
  const filePath = path.join(__dirname, "../../uploads/file", fileName);
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        // Handle the error
        console.error("Error deleting file:", err);
      } else {
        // File deleted successfully
        console.log("File deleted:", filePath);
      }
    });
  } catch (err) {
    // Handle synchronous error
    console.error("Error deleting file:", err);
  }
};
