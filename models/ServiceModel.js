const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String },
  description: { type: String },
  isDeleted: { type: Boolean, default: false },

  servicetype: [{ type: String, enum: ["IMEI", "SERVER"] }],
  fieldType: {
    type: { type: String, enum: ["SINGLE", "BOTH", "MULTIPLE", "CUSTOM"] },
    customFields: [
      {
        name: String,
        dataType: String, //NUMBERS, STRINGS
      },
    ],
  },
  credits: {
    DEALER: { type: Number },
    RESELLER: { type: Number },
    USER: { type: Number },
  },
});
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
