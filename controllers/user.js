const { sendResponse, generateToken } = require("../utils/utils");
const bcrypt = require("bcryptjs");
const userDao = require("../daos/user");
const orderDao = require("../daos/order");
const { SALTROUNDS, ROLEUSER } = require("../constants/constants");
const paymentsDao = require("../daos/payments");
const { createCustomer, createPaymentMethod, attachPaymentMethod, createPaymentIntent, confirmPaymentIntent } = require("../services/stripe");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userDao.findOneByEmail(email);

      if (user !== null) {
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
      const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
      await userDao.create({
        name: `${firstName} ${lastName}`,
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
  createStripeCustomer: async (req, res) => {
    try {
      const { userId, expiry, cardNumber, cvc } = req.body;
      const user = await userDao.findByPk(userId);
      if (user) {
        const stripeuser = await createCustomer(user.email);
        const paymentMethod = await createPaymentMethod(expiry, cardNumber, cvc);
        await attachPaymentMethod(paymentMethod.id, stripeuser.id);
        await userDao.findOneAndUpdate(
          { _id: userId },
          {
            stripeCustomerId: stripeuser.id,
            paymentMethodId: paymentMethod.id,
            isStripeAccountActive: true,
          }
        );
        sendResponse(null, req, res, { message: "Information Added" });
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  purchaseCredits: async (req, res) => {
    try {
      const { userId, credits } = req.body;
      const totalPrice = credits * 1; // one credit of $1
      const user = await userDao.findByPk(userId);
      if (user && user.isStripeAccountActive) {
        const paymentIntent = await createPaymentIntent({
          amount: Math.round(totalPrice * 100),
          currency: "usd",
          payment_method_types: ["card"],
          payment_method: user.paymentMethodId,
          customer: user.stripeCustomerId,
          confirmation_method: "automatic",
          capture_method: "automatic",
        });
        await paymentsDao.create({
          userId,
          status: "Paid",
          creditsBought: credits,
          paymentGatewayId: paymentIntent.id,
          transactionDate: new Date(),
        });
        const currentCredits = user.credits ? user.credits : 0;
        await userDao.findOneAndUpdate(
          { _id: userId },
          {
            credits: Number(currentCredits) + Number(credits), // add credits in user model
          }
        );
        sendResponse(null, req, res, {
          updatedCredits: currentCredits + credits,
          message: "Credits bought successfully",
        });
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getUserCredits: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userDao.findByPk(id);
      sendResponse(null, req, res, {
        credits: user.credits,
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  paginatedUsers: async (req, res) => {
    const { isActive, email, name } = req.body;

    try {
      const page = parseInt(req.body.page ? req.body.page : 1);
      const limit = parseInt(req.body.limit ? req.body.limit : 2);
      const startIndex = (page - 1) * limit;
      let query = { role: ROLEUSER };
      if (isActive) {
        query = { ...query, isActive };
      }
      if (email) {
        query = {
          ...query,
          email: { $regex: `^${email}$`, $options: "i" },
        };
      }
      if (name) {
        query = {
          ...query,
          name: { $regex: `^${name}$`, $options: "i" },
        };
      }
      console.log(query, "query");
      const users = await userDao.findWithPaginate(query, startIndex, limit);
      const totalUsers = await userDao.totalUsers();

      const totalPages = Math.ceil(totalUsers / limit);
      sendResponse(null, req, res, {
        users,
        totalPages,
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  findUser: async (req, res) => {
    try {
      const user = await userDao.findByPk(req.params.id);
      sendResponse(null, req, res, {
        user,
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userDao.find();
      sendResponse(null, req, res, {
        users,
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },

  updateUserById: async (req, res) => {
    try {
      await userDao.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

      sendResponse(null, req, res, { message: "User successfully updated" });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  //general
  getStats: async (req, res) => {
    try {
      //admin
      if (true) {
        //mongo aggregate order status confimed
        const creditsInProgress = await orderDao.aggregate([
          {
            $match: {
              status: "Confirmed",
            },
          },
          { $group: { _id: null, price: { $sum: "$creditsUsed" } } },
        ]);

        console.log(creditsInProgress);

        const creditUsed = await orderDao.aggregate([
          {
            $match: {
              status: "Completed",
            },
          },
          { $group: { _id: null, price: { $sum: "$creditsUsed" } } },
        ]);
        const availableBalance = await orderDao.aggregate([
          {
            $match: {
              status: "Paid",
            },
          },
          { $group: { _id: null, price: { $sum: "$creditsBought" } } },
        ]);
        sendResponse(null, req, res, {
          creditsInProgress: creditsInProgress[0] ? creditsInProgress[0].price : 0,
          creditUsed: creditUsed[0] ? creditUsed[0].price : 0,
          availableBalance: availableBalance[0] ? availableBalance[0].price : 0,
        });
      }
      // general user
      else {
        //mongo aggregate order status confimed
        //mongo aggregate order status completed
        // user own credits
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
