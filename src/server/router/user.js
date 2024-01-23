const express = require("express");
const { getAllUsers, register, deleteUser } = require("../controllers/users");

// TODO: create the middleware de authetificacion
module.exports = function (router) {
  router.get("/users", getAllUsers);
  router.post("/user/register", register);
  router.delete("/user/delete", deleteUser);
};
