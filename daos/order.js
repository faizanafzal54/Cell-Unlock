const Order = require("../models/OrderModel");

module.exports = {
  find: async () => {
    try {
      const response = await Order.find().populate({
        path: "userId",
        select: "firstName",
      });
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  create: async (obj) => {
    try {
      let newOrder = new Order(obj);
      const response = await newOrder.save();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  orderCount: async () => {
    try {
      const response = await Order.countDocuments();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
