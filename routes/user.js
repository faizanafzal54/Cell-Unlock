const router = require("express").Router();
const {
  login,
  regiser,
  createStripeCustomer,
  purchaseCredits,
  getUserCredits,
  getAllUsers,
  findUser,
} = require("../controllers/user");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.post("/login", login);
router.post("/register", regiser);
router.post("/createPaymentInfo", createStripeCustomer);
router.post("/purchaseCredits", purchaseCredits);
router.get("/credits/:id", getUserCredits);

// admin routes
router.get("/admin/user-list", getAllUsers);
router.get("/admin/user/:id", findUser);
module.exports = router;
