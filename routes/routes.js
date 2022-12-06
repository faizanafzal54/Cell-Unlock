/*jshint maxstatements: false */
const userRoutes = require("./user");
const orderRoutes = require("./order");
const serviceRoutes = require("./service");
const categoryRoutes = require("./category");

exports.configure = function (app) {
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/services", serviceRoutes);
  app.use("/api/categories", categoryRoutes);

  // admin routes

  // app.use("/api/admin/orders", orderRoutes);
};
