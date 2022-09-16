const router = require("express").Router();
const {
  getOrders,
  createOrder,
  orderById,
  updateOrder,
} = require("../controllers/order");
const { verifyToken } = require("../middleware/authValidator");

router.post("/create", verifyToken, createOrder);
router.get("/list", verifyToken, getOrders);
router.get("/:id", verifyToken, orderById);
router.patch("/:id", verifyToken, updateOrder);

module.exports = router;
