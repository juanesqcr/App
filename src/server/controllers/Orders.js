const express = require("express");
const {
  getOrders,
  createOrder,
  getOrderByTrackingNumber,
  deleteOrderByTrackingNumber,
  getOrderById,
} = require("../db/order");
const { getUserById } = require("../db/users");
const { ReturnDocument } = require("mongodb");

const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
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
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

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

const deleteOrder = async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    if (!trackingNumber) {
      console.log("Order doesn't exist");
      return res.sendStatus(404);
    }
    const existingOrder = await getOrderByTrackingNumber(trackingNumber);
    if (!existingOrder) {
      console.log("Order doesn't exist");
      return res.sendStatus(404);
    }
    const deleteOrder = await deleteOrderByTrackingNumber(trackingNumber);
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const updateOrder = async (req, res) => {
  try {
    const {
      id,
      description,
      trackingNumber,
      orderState,
      deliver,
      weight,
      cancelled,
    } = req.body;

    if (
      !id ||
      !description ||
      !trackingNumber ||
      !orderState ||
      !deliver ||
      !weight ||
      cancelled == undefined ||
      cancelled == null 
    ) {
      console.log("Data incomplete");
      return res.sendStatus(404);
    }

    const order = await getOrderById(id);
    order.description = description;
    order.trackingNumber = trackingNumber;
    order.orderState = orderState;
    order.deliver = deliver;
    order.weight = weight;
    order.cancelled = cancelled;

    await order.save();

    return res.status(200).json(order).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllOrders,
  registerOrder,
  findByTrackingNumber,
  deleteOrder,
  updateOrder,
};
