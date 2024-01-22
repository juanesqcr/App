const express = require("express");
const {
  getOrders,
  createOrder,
  getOrderById,
  getOrderByTrackingNumber,
} = require("../db/order");
const { getUserById } = require("../db/users");

const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    console.info("all orders");
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

const registerOrder = async (req, res) => {
  try {
    const { userId, trackingNumber, description } = req.body;

    if (!userId || !trackingNumber || !description) {
      console.error(
        `userId: ${userId} or tracking Number: ${trackingNumber} or ${description} are missing`
      );
      return res.sendStatus(422);
    }

    const existingUser = await getUserById(userId);

    const existingOrder = await getOrderByTrackingNumber(trackingNumber);
    if (existingOrder) {
      console.info("TrackingID already exists");
      return res.sendStatus(406);
    }

    const orderData = {
      user: existingUser.toObject(),
      trackingNumber,
      description,
    };

    const order = await createOrder(orderData);

    console.log(orderData);
    return res.status(200).json(order).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const findByTrackingNumber = async (req, res) => {
try {
  const { trackingNumber } = req.body;

  if (!trackingNumber) {
    return res.sendStatus(404);
  }
  const order = await getOrderByTrackingNumber(trackingNumber);
  if (!order) {
    return res.sendStatus(404);
  }
  return res.status(200).json(order).end();
} catch (error) {
  console.log(error);
  return res.sendStatus(500);
}

 
};

module.exports = { getAllOrders, registerOrder, findByTrackingNumber };
