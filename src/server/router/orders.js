const express = require("express");
const {
  getAllOrders,
  registerOrder,
  findByTrackingNumber,
} = require("../controllers/Orders");

// TODO: create the middleware
module.exports = function (router) {
  console.log("orders router");
  router.get("/orders", getAllOrders);
  router.post("/order/add", registerOrder);
  router.get("/order/trackingNumber", findByTrackingNumber);
};
