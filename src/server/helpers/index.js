const crypto = require("crypto");

const SECRET = "JUANES-REST-API";

const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

const random = () => crypto.randomBytes(123).toString("base64");

module.exports = { authentication, random };
