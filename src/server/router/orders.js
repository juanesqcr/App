const express = require("express");
const {
  getAllOrders,
  registerOrder,
  findByTrackingNumber,
  deleteOrder,
  updateOrder,
} = require("../controllers/Orders");

const { isAutheticated } = require("../middlewares");

// TODO: create the middleware de authetificacion
module.exports = function (router) {
  router.get("/orders", isAutheticated, getAllOrders);
  router.post("/order/add", isAutheticated, registerOrder);
  router.get("/order/trackingNumber", isAutheticated, findByTrackingNumber);
  router.delete("/order/delete", isAutheticated, deleteOrder);
  router.patch("/order/update", isAutheticated, updateOrder);
};
