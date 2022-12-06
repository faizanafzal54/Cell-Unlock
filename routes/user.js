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
  getStats,
} = require("../controllers/user");
const {
  verifyToken,
  adminVerifyToken,
} = require("../middleware/authValidator");

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.post("/login", login);
router.post("/register", regiser);
router.post("/createPaymentInfo", verifyToken, createStripeCustomer);
router.post("/purchaseCredits", verifyToken, purchaseCredits);
router.get("/credits/:id", verifyToken, getUserCredits);

// admin routes
router.post("/admin/user-list", verifyToken, adminVerifyToken, paginatedUsers);
router.get("/admin/users", verifyToken, adminVerifyToken, getAllUsers);
router.get("/admin/user/:id", verifyToken, adminVerifyToken, findUser);
router.patch("/admin/user/:id", verifyToken, adminVerifyToken, updateUserById);

router.get("/general/stats/:id", verifyToken, getStats);

module.exports = router;
