const { sendResponse, generateRandomString } = require("../utils/utils");
const orderDao = require("../daos/order");

module.exports = {
  getOrders: async (req, res) => {
    try {
      const orders = await orderDao.find({ userId: req.user._id });
      sendResponse(null, req, res, {
        orders,
      });
    } catch (error) {
      sendResponse(err, req, res, err);
    }
  },

  createOrder: async (req, res) => {
    try {
      const {
        service,
        status,
        fromDate,
        toDate,
        userId,
        imeiNumbers,
        serverFields,
        fieldType,
      } = req.body;
      const str = generateRandomString(3);
      const orderCount = await orderDao.orderCount();
      await orderDao.create({
        service,
        // status: "Pending",
        fromDate,
        toDate,
        userId,
        orderNumber: `${str}${orderCount + 1}`,
        imeiNumbers,
        serverFields,
        fieldType,
        history: [
          {
            userId,
            action: "Order Created",
            updatedAt: new Date(),
          },
        ],
      });
      sendResponse(null, req, res, { message: "Order successfully created" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  orderById: async (req, res) => {
    try {
      const order = await orderDao.findByPk(req.params.id);
      sendResponse(null, req, res, {
        order,
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  updateOrder: async (req, res) => {
    try {
      // req.body.history = [
      //   {
      //     userId,
      //     action: "Order Updated",
      //     updatedAt: new Date(),
      //   },
      // ],
      await orderDao.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
      // console.log(order);
      sendResponse(null, req, res, { message: "Order successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  // admin controllers

  adminGetOrders: async (req, res) => {
    try {
      const page = parseInt(req.query.page ? req.query.page : 1);
      const limit = parseInt(req.query.limit ? req.query.limit : 2);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      console.log({ startIndex, endIndex });

      const orders = await orderDao.getPaginatedOrders(startIndex, limit);
      const orderCount = await orderDao.orderCount();

      const totalPages = orderCount / limit;
      sendResponse(null, req, res, {
        orders,
        totalPages,
      });
    } catch (error) {
      sendResponse(err, req, res, err);
    }
  },

  adminUpdateOrder: async (req, res) => {
    try {
      await orderDao.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
      // console.log(order);
      sendResponse(null, req, res, { message: "Order successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
