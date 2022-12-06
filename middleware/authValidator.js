const jwt = require("jsonwebtoken");
const config = require("../config").development;
const { sendResponse } = require("../utils/utils");

exports.verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      const authData = await jwt.verify(bearerToken, config.jwtSecret);
      req.user = authData.user;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    err.statusCode = 401;
    sendResponse(err, req, res, err);
  }
};

exports.adminVerifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (req.user.role === "ADMIN") {
      next();
    } else {
      let err = new Error("UnAuthorized");
      err.statusCode = 403;
      return sendResponse(err, req, res, err);
    }
  } catch (err) {
    err.statusCode = 403;
    sendResponse(err, req, res, err);
  }
};
