const ShortUniqueId = require("short-unique-id");

const uid = new ShortUniqueId({ length: 20 });
const id = uid();

module.exports = id;
