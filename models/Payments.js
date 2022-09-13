const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  paymentGatewayId: { type: String },
  status: { type: String, trim: true, enum: ["Created", "Paid"] }, //Paid
  transactionRef: { type: String, trim: true },
  creditsBought: { type: Number },
});
const Payment = mongoose.model("Payment", paymentsSchema);
module.exports = Payment;
