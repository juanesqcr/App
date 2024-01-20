const express = require("express");
const user = require("./user");

const router = express.Router();

export default () => {
  user(router);
  return router;
};
