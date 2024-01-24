const express = require("express");
const {
  getAllOrders,
  registerOrder,
  findByTrackingNumber,
  deleteOrder,
  updateOrder,
} = require("../controllers/Orders");

// TODO: create the middleware de authetificacion
module.exports = function (router) {
  router.get("/orders", getAllOrders);
  router.post("/order/add", registerOrder);
  router.get("/order/trackingNumber", findByTrackingNumber);
  router.delete("/order/delete", deleteOrder);
  router.patch("/order/update", updateOrder);
};
