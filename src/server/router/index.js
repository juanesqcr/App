const express = require("express");
const user = require("./user");

const router = express.Router();

module.exports = function(){
  user(router);
  return router;
};

