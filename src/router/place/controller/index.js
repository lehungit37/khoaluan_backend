const axios = require("axios");
require("cross-fetch/polyfill");
require("isomorphic-form-data");
const { ApiKey } = require("@esri/arcgis-rest-auth");
const { geocode } = require("@esri/arcgis-rest-geocoding");
const { request } = require("@esri/arcgis-rest-request");

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

      const apiKey =
        "AAPK85a27ae3039748a594ded3cfb1552280oJKueMa3AgGiM2hgiz3ZG82h3wOisfX3QbdvEps-hcWG7HafEtM8xVk9vO7fup-H";
      const authentication = new ApiKey({
        key: apiKey
      });

      // request("https://www.arcgis.com/sharing/rest/info").then((response) =>
      //   console.log(response)
      // );
      geocode({
        address,

        authentication
      }).then((response) => {
        const formatAddress = response.candidates?.[0].address;
        const { location } = response.candidates?.[0];
        const rootLocation = `${location.y}, ${location.x}`;
        console.log(response);

        return res.status(200).json({ address: formatAddress, rootLocation });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};
module.exports = placeController;
