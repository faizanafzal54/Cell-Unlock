const Order = require("../models/OrderModel");

module.exports = {
  find: async () => {
    try {
      const response = await Order.find()
        .populate({
          path: "userId",
          select: "firstName",
        })
        .populate({
          path: "service",
          select: "name",
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
  findByPk: async (id) => {
    try {
      const order = await Order.findById(id)
        .populate({
          path: "service",
          select: "name",
        })
        .populate({
          path: "userId",
          select: "firstName lastName",
        });
      return order;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findOneAndUpdate: async (where, update) => {
    try {
      const response = await Order.findOneAndUpdate(where, update, {
        new: true,
      });
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  getPaginatedOrders: async (query, startIndex, endIndex) => {
    try {
      const response = await Order.find(query)
        .populate({
          path: "userId",
          select: "firstName",
        })
        .populate({
          path: "service",
          select: "name",
        })
        .skip(startIndex)
        .limit(endIndex);
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
