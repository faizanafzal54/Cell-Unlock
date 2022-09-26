const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String },
  description: { type: String },
  credits: { type: Number },
  isDeleted: { type: Boolean, default: false },

  type: { type: String, enum: ["IMEI", "SERVER"] },
});
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
