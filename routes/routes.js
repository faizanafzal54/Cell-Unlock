/*jshint maxstatements: false */
const userRoutes = require("./user");
const orderRoutes = require("./order");

exports.configure = function (app) {
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
};
