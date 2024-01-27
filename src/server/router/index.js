const express = require("express");
const user = require("./user");
const order = require("./orders");
const auth = require("./authentication");

const router = express.Router();

module.exports = function () {
  user(router);
  order(router);
  auth(router);
  return router;
};
