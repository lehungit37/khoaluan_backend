const multer = require("multer");
const path = require("path");
const {
  multipleUploadMiddleware,
  simpleUploadMiddleware
} = require("../middleware");

const imageController = {
  uploadImage: async (req, res, next) => {
    try {
      await simpleUploadMiddleware(req, res);
      const host = req.host;
      const filePath =
        "http://" + host + ":3000/api/images/" + req.file.filename;
      const file = req.file;
      const dataSend = {
        url: filePath,
        filename: file.filename,
        size: file.size
      };
      return res.status(200).json(dataSend);
    } catch (error) {
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  uploadMultipleImage: async (req, res) => {
    try {
      await multipleUploadMiddleware(req, res);

      const files = req.files;
      //không up ảnh
      if (files.length < 1) {
        return res
          .status(400)
          .json({ messages: "Vui lòng chọn ảnh để upload" });
      } else if (files.length > 10) {
        // quá số lượng up ảnh cho phép: 10
        return res
          .status(400)
          .json({ messages: "Số lượng ảnh quá nhiều. Tối đa 10 ảnh" });
      } else {
        const dataSend = [];
        files?.map((file) => {
          const host = req.host;
          const filePath =
            "http://" + host + ":3000/api/images/" + file.filename;
          dataSend.push({
            url: filePath,
            filename: file.filename,
            size: file.size
          });
        });
        return res.status(200).json(dataSend);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Đã có lỗi, vui lòng thử lại" });
    }
  },

  sendFile: (req, res, next) => {
    const options = {
      root: path.join("src/public/images"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
      }
    };

    let fileName = req.params.name;
    res.sendFile(fileName, options, (err) => {
      if (err) {
        next(err);
      } else {
        console.log("Sent", fileName);
      }
    });
  }
};
module.exports = imageController;
