const { sendResponse, generateRandomString } = require("../utils/utils");
const orderDao = require("../daos/order");
const userDao = require("../daos/user");
const serviceDao = require("../daos/service");

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
      // here we will check the user own credits and service credits

      const user = await userDao.findByPk(userId);
      const selectedService = await serviceDao.findByPk(service);
      const userType = selectedService.credits[user?.userType ?? "USER"];
      if (user.credits < userType) {
        let err = new Error(
          "You don't have enough credits to place this order"
        );
        err.statusCode = 400;
        return sendResponse(err, req, res, err);
      }

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
      const user = userDao.findByPk(req.body.userId);
      console.log(user.role, "role:::::::::::");
      const updateQuery = {
        ...req.body,
        $push: {
          history: {
            userId: req.body.userId,
            action:
              user.role === "ADMIN"
                ? "Order Updated By Admin"
                : "Order Updated",
            updatedAt: new Date(),
          },
        },
      };
      await orderDao.findOneAndUpdate(
        { _id: req.params.id },
        { ...updateQuery }
      );
      sendResponse(null, req, res, { message: "Order successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  // admin controllers

  adminGetOrders: async (req, res) => {
    const { status, userId, orderNumber } = req.body;
    try {
      const page = parseInt(req.body.page ? req.body.page : 1);
      const limit = parseInt(req.body.limit ? req.body.limit : 2);
      const startIndex = (page - 1) * limit;

      let query = {};
      if (status) {
        query = {
          ...query,
          status,
        };
      }
      if (userId) {
        query = {
          ...query,
          userId,
        };
      }
      if (orderNumber) {
        query = {
          ...query,
          orderNumber: { $regex: `^${orderNumber}$`, $options: "i" },
        };
      }
      console.log(query, "query");
      const orders = await orderDao.getPaginatedOrders(
        query,
        startIndex,
        limit
      );
      const orderCount = await orderDao.orderCount();

      const totalPages = orderCount / limit;
      sendResponse(null, req, res, {
        orders,
        totalPages,
      });
    } catch (err) {
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
