const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  serviceType: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "In Progress", "Completed", "Rejected"],
    default: "Pending",
  },
  fromDate: { type: Date },
  toDate: { type: Date },
  serialNumber: { type: String },
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
  creditsUsed: {
    type: Number,
    default: 0,
  },
  code: { type: String, trim: true },
  description: { type: String, trim: true },
},
  {
    timestamps: true,
  });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
