const { sendResponse, generateToken } = require("../utils/utils");
const bcrypt = require("bcryptjs");
const userDao = require("../daos/user");
const { saltRounds, ROLEUSER } = require("../constants/constants");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userDao.findOneByEmail(email);

      if (user !== null && user.role === ROLEUSER) {
        if (user.isActive === false) {
          let err = new Error("Account has been deleted");
          err.statusCode = 403;
          sendResponse(err, req, res, err);
          return;
        }
        if (!user.password) {
          let err = new Error("User has not registed completely");
          err.statusCode = 403;
          sendResponse(err, req, res, err);
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
          const data = {
            ip: req.ip,
            role: user.role,
            user: {
              _id: user._id,
              name: user.firstName + " " + user.lastName,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              phone: user.phone,
              image: user.image,
            },
          };
          const token = generateToken(data, "3d");
          sendResponse(null, req, res, {
            token,
            user: data.user,
          });
        } else {
          let err = new Error("Password is incorrect");
          err.statusCode = 403;
          sendResponse(err, req, res, err);
        }
      } else {
        let err = new Error("Email does not exist");
        err.statusCode = 404;
        sendResponse(err, req, res, err);
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  regiser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await userDao.create({
        firstName,
        lastName,
        email,
        gender,
        password: hashedPassword,
        role: ROLEUSER,
      });
      sendResponse(null, req, res, { message: "Account successfully created" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
