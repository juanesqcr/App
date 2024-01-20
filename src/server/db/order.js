const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: [{ type: String, required: true }],
  trackingNumber: { type: String, required: true },
  orderState: { type: String, default: "Pending" },
  deliver: { type: String, default: "On the way" },
  weight: { type: Number, min: 0, max: 999, default: 0 },
});
