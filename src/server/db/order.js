const mongoose = require("mongoose");

const Orderschema = new mongoose.Schema({
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  description: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  orderState: { type: String, default: "Pending" },
  deliver: { type: String, default: "On the way" },
  weight: { type: Number, min: 0, max: 999, default: 0 },
  cancelled: { type: Boolean, default: false },
  price: { type: Number, min: 0, default: 0 }
});

const ordersModel = mongoose.model("Orders", Orderschema);

const getOrders = () => ordersModel.find().populate("user");
const getOrderById = (id) => ordersModel.findById(id);
const createOrder = async (orderData) => {
  const order = await new ordersModel(orderData).save();
  return order;
};
const deleteOrderById = (id) => ordersModel.findByIdAndDelete({ _id: id });
const deleteOrderByTrackingNumber = (trackingNumber) =>
  ordersModel.findOneAndDelete(trackingNumber);
const updateOrderById = (id, values) =>
  ordersModel.findByIdAndUpdate(id, values, { new: true });
const getOrdersByUser = (userId) =>
  ordersModel.find({ user: userId }).populate("user");
const getOrderByTrackingNumber = (trackingNumber) =>
  ordersModel.findOne({ trackingNumber }).populate("user");

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  updateOrderById,
  getOrdersByUser,
  getOrderByTrackingNumber,
  deleteOrderByTrackingNumber,
};
