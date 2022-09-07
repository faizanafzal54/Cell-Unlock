/*jshint maxstatements: false */
const userRoutes = require("./user");

exports.configure = function (app) {
  app.use("/api/users", userRoutes);
};
