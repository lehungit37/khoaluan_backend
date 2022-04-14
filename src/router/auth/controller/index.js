const userModel = require("../../../models/user");
const ShortUniqueId = require("short-unique-id");
const _JWT = require("../../../common/_JWT");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fastroomdanang@gmail.com",
    pass: "Hung@123"
  }
});

const authController = {
  login: async (req, res) => {
    try {
      const data = req.body;
      const user = await userModel.checkLogin(data);
      if (user) {
        if (user.isLock) {
          return res.status(400).json({
            messages: "Tài khoản của bạn đang bị tạm khoá. Vui lòng quay lại "
          });
        } else {
          const newToken = await _JWT.makeToken(user);
          req.headers.authorization = newToken;
          return res.status(200).json({ token: newToken });
        }
      } else {
        return res.status(400).json({
          messages:
            "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng đăng nhập lại"
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  register: async (req, res) => {
    const data = req.body;

    const user = await userModel.checkUser({
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      email: data.email
    });
    if (user) {
      return res
        .status(400)
        .json({ messages: "Tài khoản đã tồn tại, vui lòng nhập lại" });
    } else {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();

      try {
        const newUser = await userModel.addUser({ id, ...data });
        return res
          .status(200)
          .json({ messages: "Đăng ký thành công", data: newUser });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ messages: "Lỗi hệ thống" });
      }
    }
  },
  loginWithAdmin: async (req, res) => {
    try {
      const data = req.body;
      if (Object.keys(data).length === 0) {
        return res
          .status(400)
          .json({ messages: "Dữ liệu bị sai. Vui lòng thử lại" });
      }
      const user = await userModel.checkLogin(data);
      if (user) {
        if (user.permissionId === "admin") {
          const newToken = await _JWT.makeToken(data);
          return res.status(200).json({ token: newToken });
        } else {
          return res
            .status(400)
            .json({ message: "Bạn không có quyền truy cập" });
        }
      } else {
        return res.status(400).json({
          messages:
            "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng đăng nhập lại"
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const data = await userModel.forgetPassword(email);

      if (!data) {
        return res
          .status(400)
          .json({ messages: "Địa chỉ email không tìm thấy. Vui lòng thử lại" });
      }

      const { userName, password } = data;
      const option = {
        from: '"FastRoom Đà Nẵng" <fastroomdanang@gmail.com>',
        to: email,
        subject: "Lấy lại thông tin đăng nhập !!!",
        html: `<b>FastRoom Đà Nẵng xin chào</b><br>
            <p>Vui lòng bảo mật thông tin đăng nhập của bạn cẩn thận.</p>
            <p>Tên đăng nhập: ${userName}</p>
            <p>Mật khẩu: ${password}</p>
      `
      };

      await transporter
        .sendMail(option)
        .then((info) => {
          console.log(info);
          return res.status(200).json({ success: true });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ messages: "Đã có lỗi, Vui lòng thử lại" });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = authController;
