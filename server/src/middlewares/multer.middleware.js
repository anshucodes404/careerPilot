import multer from "multer"
//multer middleware for uploading resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//filtering the file should be pdf/png/jpg
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
  if(allowedTypes.includes(file.mimetype)){
      cb(null, true)
  } else {
    cb(new Error("Only jpg/jpeg/png and PDFs are allowed"), false)
  }
}

export const upload = multer({ storage, fileFilter });