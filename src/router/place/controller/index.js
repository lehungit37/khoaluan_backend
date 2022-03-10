const axios = require("axios");
const placeController = {
  getDistrict: async (req, res) => {
    const id = 48; //48 is id of Da Nang
    try {
      await axios
        .get(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
        .then((data) => {
          const newData = data.data;
          return res.status(200).json(newData);
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(400)
            .json({ messages: "Đã có lỗi xảy ra. Vui lòng thử lại" });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};
module.exports = placeController;
