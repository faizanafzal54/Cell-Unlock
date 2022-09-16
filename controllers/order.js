const { sendResponse, generateRandomString } = require("../utils/utils");
const orderDao = require("../daos/order");

module.exports = {
  getOrders: async (req, res) => {
    try {
      const orders = await orderDao.find();
      sendResponse(null, req, res, {
        orders,
      });
    } catch (error) {
      sendResponse(err, req, res, err);
    }
  },

  createOrder: async (req, res) => {
    try {
      const { service, status, fromDate, toDate, userId, imeiNumbers } =
        req.body;
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
      await orderDao.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
      // console.log(order);
      sendResponse(null, req, res, { message: "Order successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
