const express = require("express");
const {
  getOrders,
  createOrder,
  getOrderByTrackingNumber,
  deleteOrderByTrackingNumber,
  getOrderById,
  getOrdersByUser
} = require("../db/order");
const { getUserById } = require("../db/users");
const { ReturnDocument } = require("mongodb");

const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    console.log(orders);
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

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.body; // Obtiene el ID del usuario del cuerpo de la solicitud

    if (!userId) {
      // Si no se proporciona un ID de usuario en el cuerpo, devuelve un error 400
      return res.status(400).json({ message: 'Se requiere un ID de usuario' });
    }

    // Llama a la función para obtener las órdenes por ID de usuario
    const orders = await getOrdersByUser(userId);

    if (!orders) {
      // Si no se encuentran órdenes para el usuario, devuelve un error 404
      return res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
    }

    // Si se encuentran órdenes, devuelve las órdenes asociadas al usuario
    return res.status(200).json(orders);
  } catch (error) {
    // Si ocurre un error, devuelve un error 500
    console.error('Error al obtener órdenes por usuario:', error);
    return res.status(500).json({ message: 'Error del servidor' });
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
    //TODO: guardar esta variable en la BD
    const weightPrice = 9;
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
    order.price = weight*weightPrice;

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
  getOrdersByUserId,
  deleteOrder,
  updateOrder,
};
