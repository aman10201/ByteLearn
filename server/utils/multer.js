import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 500 * 1024 * 1024 } // 500 MB
});

export default upload;