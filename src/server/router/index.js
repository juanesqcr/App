const express = require("express");
const user = require("./user");
const order = require("./orders");

const router = express.Router();

module.exports = function(){
  user(router);
  order(router)
  return router;
};

