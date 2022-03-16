const axios = require("axios");
const NodeGeocoder = require("node-geocoder");

const placeController = {
  getDistrict: async (req, res) => {
    const id = 48; //48 is id of Da Nang
    try {
      await axios
        .get(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
        .then((data) => {
          const newData = data.data;

          const city = [{ name: newData.name, code: newData.code }];
          const districts = newData?.districts;

          return res.status(200).json({ city, districts });
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
  },
  getGeoCoder: async (req, res) => {
    try {
      const { address } = req.body;
      if (address) {
        // const option = {
        //   provider: "mapquest",

        //   // Optional depending on the providers
        //   httpAdapter: "https",
        //   apiKey: "61vSK2aApccq5RySL9fXTmJzGv0Q4PMw" // for Mapquest, OpenCage, Google Premier
        //   // formatter: null // 'gpx', 'string', ...
        // };

        // const geocoder = NodeGeocoder(option);

        // const data = await geocoder.geocode(address);
        // const mainLocation = data[0];
        // // console.log(data);
        // const rootLocation = `${mainLocation.latitude}, ${mainLocation.longitude}`;

        const ACCESS_KEY = "1152083462cf22a07a6ac55671e97791";

        const url = `http://api.positionstack.com/v1/forward?access_key=${ACCESS_KEY}&query=${address}`;
        console.log(url);
        const xxx = await axios.get(url);
        console.log(xxx);
        // return res.status(200).json({ rootLocation });
      } else {
        return res.status(400).json("Địa chỉ sai");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};
module.exports = placeController;
