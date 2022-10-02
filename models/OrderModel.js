const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  status: {
    type: String,
    enum: ["Confirmed", "Completed", "Rejected"],
    default: "Confirmed",
  },
  fromDate: { type: Date },
  toDate: { type: Date },
  orderNumber: { type: String },
  imeiNumbers: [
    {
      type: String,
    },
  ],
  serverFields: [
    {
      type: String,
    },
  ],

  fieldType: {
    type: { type: String, enum: ["SINGLE", "BOTH", "MULTIPLE", "CUSTOM"] },
    customFields: [
      {
        name: String,
        value: String, //number, text
      },
    ],
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  history: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      action: {
        type: String,
      },
      updatedAt: {
        type: Date,
      },
    },
  ],

  code: { type: String, trim: true },
  description: { type: String, trim: true },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
