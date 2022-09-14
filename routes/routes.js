/*jshint maxstatements: false */
const userRoutes = require("./user");
const serviceRoutes = require("./service");

exports.configure = function (app) {
  app.use("/api/users", userRoutes);
  app.use("/api/services", serviceRoutes);
};
