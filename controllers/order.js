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
        serialNumber,
      } = req.body;
      // here we will check the user own credits and service credits

      const user = await userDao.findByPk(userId);
      const selectedService = await serviceDao.findByPk(service);
      const serviceCredits = selectedService?.credits[user?.userType ?? "USER"]; // credits based on user type
      if (user?.credits < serviceCredits) {
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
        serialNumber,
        creditsUsed: serviceCredits,
        fromDate,
        toDate,
        userId,
        orderNumber: `${str}${orderCount + 1}`,
        imeiNumbers,
        serverFields,
        fieldType,
        serviceType: selectedService.serviceType ?? "IMEI",
        history: [
          {
            userId,
            action: "Order Created",
            updatedAt: new Date(),
          },
        ],
      });
      const creditDeduction = Number(user.credits - serviceCredits);
      const newUser = await userDao.findOneAndUpdate(
        { _id: user._id },
        {
          credits: creditDeduction,
        }
      );

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
      const user = await userDao.findByPk(req.body.userId);
      const order = await orderDao.findByPk(req.params.id);

      const updateQuery = {
        ...req.body,
        history: [
          ...order?.history,
          {
            userId: req.body.userId,
            action:
              user.role === "ADMIN"
                ? "Order Updated By Admin"
                : "Order Updated",
            updatedAt: new Date(),
          },
        ],
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
    const { status, userId, orderNumber, serviceType } = req.body;
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
      if (serviceType) {
        query = {
          ...query,
          serviceType,
        };
      }
      if (orderNumber) {
        query = {
          ...query,
          orderNumber: { $regex: `^${orderNumber}$`, $options: "i" },
        };
      }
      const orders = await orderDao.getPaginatedOrders(
        query,
        { fromDate: -1 },
        startIndex,
        limit
      );
      const orderCount = await orderDao.orderCount();

      sendResponse(null, req, res, {
        orders,
        total: orderCount,
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  adminUpdateOrder: async (req, res) => {
    try {
      const order = await orderDao.findByPk(req.params.id);
      const updateQuery = {
        ...req.body,
        history: [
          ...order?.history,
          {
            userId: req.body.userId,
            action: "Order Updated By Admin",
            updatedAt: new Date(),
          },
        ],
      };
      await orderDao.findOneAndUpdate({ _id: req.params.id }, updateQuery);
      // console.log(order);
      sendResponse(null, req, res, { message: "Order successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
