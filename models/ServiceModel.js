const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String },
  description: { type: String },
  isDeleted: { type: Boolean, default: false },

  serviceType: { type: String, enum: ["IMEI", "SERVER"] },
  fieldType: {
    type: { type: String, enum: ["SINGLE", "BOTH", "MULTIPLE", "CUSTOM"] },
    customFields: [
      {
        name: String,
        dataType: String, //number, text
      },
    ],
  },
  credits: {
    DEALER: { type: Number },
    RESELLER: { type: Number },
    USER: { type: Number },
  },
  price: { type: Number, default: 0 },
  costPrice: { type: Number, default: 0 },
  supplier: { type: String, trim: true },
  deliveryTime: { type: String, trim: true },
  redirectUrl: { type: String, trim: true },
  responseDelayTime: { type: String, trim: true },
  serviceImage: { type: String },
  detail: { type: String, trim: true },
  tremsCond: { type: Boolean, default: false },
  pendingOrderCancel: { type: Boolean, default: false },
  orderCancelTime: { type: String },
  orderVerification: { type: Boolean, default: false },
  orderVerfiyTime: { type: String },
  duplicateIMEI: { type: Boolean, default: false },
  features: [
    {
      type: String,
    },
  ],
  seoInfo: {
    name: { type: String, trim: true },
    htmlTitle: { type: String, trim: true },
    urlName: { type: String, trim: true },
    tags: [
      {
        type: String,
      },
    ],
    keywords: [
      {
        type: String,
      },
    ],
  },
  // categoryInfo: {
  //   name: { type: String, trim: true },
  //   htmlTitle: { type: String, trim: true },
  //   urlName: { type: String, trim: true },
  //   tags: [
  //     {
  //       type: String,
  //     },
  //   ],
  //   keywords: [
  //     {
  //       type: String,
  //     },
  //   ],
  // },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
});
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
