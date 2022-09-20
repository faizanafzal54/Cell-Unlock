const Payments = require("../models/PaymentsModel");

module.exports = {
  find: async (where, update) => {
    try {
      const response = await Payments.find();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  create: async (obj) => {
    try {
      let payment = new Payments(obj);
      const response = await payment.save();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findOneAndUpdate: async (where, update) => {
    try {
      const response = await Payments.findOneAndUpdate(where, update, {
        new: true,
      });
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findOneWhere: async (where) => {
    try {
      const payment = await Payments.findOne(where);
      return payment;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findByIdAndDelete: async (_id) => {
    try {
      const payment = await Payments.findByIdAndDelete(_id);
      return payment;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findByPk: async (id) => {
    try {
      const payment = await Payments.findById(id);
      return payment;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
