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
};
