const express = require("express");
const { getAllUsers, register } = require("../controllers/users");

// TODO: create the middleware
module.exports = function (router) {
  router.get("/users", getAllUsers);
  router.post("/users/register", register);
};
