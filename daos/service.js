const Service = require("../models/ServiceModel");

module.exports = {
  find: async () => {
    try {
      const response = await Service.find({});
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findWithPagination: async (query, startIndex, endIndex) => {
    try {
      const response = await Service.find(query)
        .skip(startIndex)
        .limit(endIndex);
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  create: async (obj) => {
    try {
      let service = new Service(obj);
      const response = await service.save();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findOneAndUpdate: async (where, update) => {
    try {
      const response = await Service.findOneAndUpdate(where, update, {
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
      const service = await Service.findOne(where);
      return service;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findByIdAndDelete: async (_id) => {
    try {
      const service = await Service.findByIdAndDelete(_id);
      return service;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
  findByPk: async (id) => {
    try {
      const service = await Service.findById(id);
      return service;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  totalServices: async (req, res) => {
    try {
      return await Service.countDocuments({});
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
