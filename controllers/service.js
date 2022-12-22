const { sendResponse } = require("../utils/utils");
const serviceDao = require("../daos/service");
const categoryDao = require("../daos/category");

module.exports = {
  createService: async (req, res) => {
    try {

      let payload = { ...req.body }

      if (req.body.categoryId === undefined || req.body.categoryId === '' || req.body.categoryId === null) {
        const generalCatId = await categoryDao.findOneWhere({ name: 'General' });
        payload = {
          ...payload,
          categoryId: generalCatId?._id ?? '63a43ab0147a64d44233ba93'
        }
      }
      await serviceDao.create(payload);
      sendResponse(null, req, res, { message: "Service successfully created" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  getAllServices: async (req, res) => {
    try {
      let services = await serviceDao.aggregate([
        {
          $match: {
            serviceType: req.query.type,
          },
        },

        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "services",
          },
        },
        {
          $group: {
            _id: "$services.name",
            goruped_services: { $addToSet: "$$ROOT" },
          },
        },
      ]);

      services = services.map((item) => {
        return {
          label: item?._id[0],
          options: item?.goruped_services?.map((innerItem) => {
            return {
              ...innerItem,
              value: innerItem._id,
              label: innerItem.name,
            };
          }),
        };
      });
      sendResponse(null, req, res, { services });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  serivicesWithFilters: async (req, res) => {
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
      const services = await serviceDao.findWithPagination(
        query,
        startIndex,
        limit
      );
      const totalServices = await serviceDao.totalServices();

      sendResponse(null, req, res, { services, total: totalServices });
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
