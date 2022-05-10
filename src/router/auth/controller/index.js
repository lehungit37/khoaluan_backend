const userModel = require("../../../models/user");
const ShortUniqueId = require("short-unique-id");
const _JWT = require("../../../common/_JWT");
const nodemailer = require("nodemailer");
const _ = require("lodash");

const { checkToken } = require("../../../common/_JWT");

const config = require("../../../config");
const client = require("twilio")(config.accountSID, config.authToken);

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
            .json({ messages: "Bạn không có quyền truy cập" });
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
      const { phoneNumber, newPassword } = req.body;

      const data = await userModel.forgetPassword({ phoneNumber, newPassword });

      if (data > 0) return res.status(200).json("OK");
      return res.status(400).json({ messages: "Thay đổi mật khẩu thất bại" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  authenticator: async (req, res) => {
    try {
      const { token } = req.body;

      if (token) {
        const { data } = await checkToken(token);

        console.log(data);
        const { permissionId } = await userModel.checkLogin(data);

        if (permissionId === "admin") {
          return res.status(200).json("OK");
        } else {
          return res.status(401).json("fail");
        }
      } else {
        return res.status(401).json("fail");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  //change phoneNumber
  sendCode: async (req, res) => {
    try {
      const { phoneNumber } = req.query;

      try {
        const arrNumber = phoneNumber.split("");

        arrNumber[0] = "+84";

        const newPhoneNumber = arrNumber.join("");

        const result = await client.verify
          .services(config.serviceID)
          .verifications.create({
            to: `${newPhoneNumber}`,
            channel: "sms"
          });

        return res.status(200).send("OK");
      } catch (error) {
        console.log(error);
        return res.status(400).json({ messages: "Vui lòng thử lại sau 1p" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  veryfyCode: async (req, res) => {
    try {
      const { phoneNumber, code } = req.query;

      const arrNumber = phoneNumber.split("");

      arrNumber[0] = "+84";

      const newPhoneNumber = arrNumber.join("");

      console.log({ newPhoneNumber, code });

      await client.verify
        .services(config.serviceID)
        .verificationChecks.create({ to: `${newPhoneNumber}`, code })
        .then((data) => {
          const { valid } = data;

          console.log(valid);
          if (!valid) {
            return res.status(401).json({ messages: "Mã xác nhận không đúng" });
          }
          return res.status(200).json("OK");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = authController;
