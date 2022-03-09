const multer = require("multer");
const path = require("path");
const util = require("util");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: "1000000"
  },
  fileFilter: (req, file, cb) => {
    const fileType = /jpeg|jpg|png|gif/;
    const mimeType = fileType.test(file.mimetype);
    const extname = fileType.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Định dạng ảnh không đúng");
  }
});

const simpleUpload = upload.single("file");
const multipleUpload = upload.array("multiple_file", 10);

const simpleUploadMiddleware = util.promisify(simpleUpload);
const multipleUploadMiddleware = util.promisify(multipleUpload);

module.exports = { simpleUploadMiddleware, multipleUploadMiddleware };
