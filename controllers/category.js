const { sendResponse } = require("../utils/utils");
const categoryDao = require("../daos/category");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      await categoryDao.create({
        name,
        description,
      });
      sendResponse(null, req, res, {
        message: "Category successfully created",
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await categoryDao.find();
      sendResponse(null, req, res, {
        categories,
      });
    } catch (error) {
      sendResponse(err, req, res, err);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await categoryDao.findByPk(req.params.id);
      sendResponse(null, req, res, {
        category,
      });
    } catch (error) {
      sendResponse(err, req, res, err);
    }
  },

  updateCategory: async (req, res) => {
    const { name, description } = req.body;
    try {
      await categoryDao.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          description,
        }
      );
      sendResponse(null, req, res, {
        message: "Category successfully updated",
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
