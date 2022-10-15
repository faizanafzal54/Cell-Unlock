const router = require("express").Router();
const {
  login,
  regiser,
  createStripeCustomer,
  purchaseCredits,
  getUserCredits,
  getAllUsers,
  findUser,
  paginatedUsers,
  updateUserById,
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
router.post("/admin/user-list", paginatedUsers);
router.get("/admin/users", getAllUsers);
router.get("/admin/user/:id", findUser);
router.patch("/admin/user/:id", updateUserById);
module.exports = router;
