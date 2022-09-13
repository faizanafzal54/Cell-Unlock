const Order = require("../models/OrderModel");

module.exports = {
  find: async () => {
    try {
      const response = await User.find();
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
};
