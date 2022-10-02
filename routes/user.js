const router = require("express").Router();
const {
  login,
  regiser,
  createStripeCustomer,
  purchaseCredits,
  getUserCredits,
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
module.exports = router;
