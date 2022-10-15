const { sendResponse } = require("../utils/utils");
const serviceDao = require("../daos/service");

module.exports = {
  createService: async (req, res) => {
    try {
      const { name, description, credits } = req.body;
      await serviceDao.create({
        ...req.body,
      });
      sendResponse(null, req, res, { message: "Service successfully created" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getAll: async (req, res) => {
    const { serviceType, name, isDeleted } = req.body;
    try {
      const page = parseInt(req.body.page ? req.body.page : 1);
      const limit = parseInt(req.body.limit ? req.body.limit : 2);
      const startIndex = (page - 1) * limit;

      let query = {};
      if (isDeleted) {
        query = { ...query, isDeleted };
      }
      if (serviceType) {
        query = {
          ...query,
          serviceType: { $regex: `^${serviceType}$`, $options: "i" },
        };
      }
      if (name) {
        query = {
          ...query,
          name: { $regex: `^${name}$`, $options: "i" },
        };
      }
      console.log(query, "query");
      const services = await serviceDao.find(query, startIndex, limit);
      const totalServices = await serviceDao.totalServices();

      const totalPages = Math.ceil(totalServices / limit);
      sendResponse(null, req, res, { services, totalPages });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  serviceById: async (req, res) => {
    try {
      const service = await serviceDao.findByPk(req.params.id);
      sendResponse(null, req, res, { service });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  updateService: async (req, res) => {
    try {
      await serviceDao.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );

      sendResponse(null, req, res, { message: "Service successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
