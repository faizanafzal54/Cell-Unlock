const router = require("express").Router();
const {
  getOrders,
  createOrder,
  orderById,
  updateOrder,
  adminGetOrders,
  adminUpdateOrder,
} = require("../controllers/order");
const {
  verifyToken,
  adminVerifyToken,
} = require("../middleware/authValidator");

router.post("/create", verifyToken, createOrder);
router.get("/list", verifyToken, getOrders);
router.get("/:id", verifyToken, orderById);
router.patch("/:id", verifyToken, updateOrder);

// admin routes

router.post("/admin/list", verifyToken, adminVerifyToken, adminGetOrders);
router.patch("/admin/:id", verifyToken, adminVerifyToken, adminUpdateOrder);

module.exports = router;
