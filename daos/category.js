const Category = require("../models/CategoryModel");

module.exports = {
  create: async (obj) => {
    try {
      let newCategory = new Category(obj);
      const response = await newCategory.save();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  find: async () => {
    try {
      const response = await Category.find();
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findByPk: async (id) => {
    try {
      const category = await Category.findById(id);

      return category;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },

  findOneAndUpdate: async (where, update) => {
    console.log({ where, update });
    try {
      const response = await Category.findOneAndUpdate(where, update, {
        new: true,
      });
      return response;
    } catch (err) {
      let error = new Error(err);
      error.statusCode = 400;
      throw error;
    }
  },
};
