const { isString } = require("lodash");

function checkPassword(password) {
  if (!isString(password)) return "Mật khẩu không hợp lệ";
  if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
  return "";
}

module.exports.checkPassword = checkPassword;
