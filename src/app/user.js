const { StatusCodes } = require("http-status-codes");

const user = {
  updatePassWord: async function UpdatePassword(
    userId,
    currentPassword,
    newPassword
  ) {
    throw new AppError(
      "UpdatePassword",
      "Mật khẩu ko đúng",
      null,
      null,
      StatusCodes.BAD_REQUEST
    );
  }
};

module.exports = user;
