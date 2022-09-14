const { sendResponse } = require("../utils/utils");
const serviceDao = require("../daos/service");

module.exports = {
  createService: async (req, res) => {
    try {
      const { name, description, credits } = req.body;
      await serviceDao.create({
        name,
        description,
        credits,
      });
      sendResponse(null, req, res, { message: "Service successfully created" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getAll: async (req, res) => {
    try {
      const services = await serviceDao.find();
      sendResponse(null, req, res, { services });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
