const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
  },
  phone: {
    type: String,
  },
  resetPasswordLink: {
    type: String,
  },
  inviteLink: {
    type: String,
  },
  inviteLinkDate: {
    type: Date,
  },
  invitedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  socialId: {
    type: String,
  },
  socialProvider: {
    type: String,
  },
  isProfileComplete: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  timeZone: {
    type: String,
    default: "America/New_York",
  },
  credits: {
    type: Number,
    default: 0,
  },
  cardInfo: {
    expiry: String,
    cardNumber: String,
    cardName: String,
  },
  stripeCustomerId: {
    type: String,
  },
  paymentMethodId: {
    type: String,
  },
  isStripeAccountActive: {
    type: Boolean,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
