const router = require("express").Router();
const { getOrders, createOrder } = require("../controllers/order");
const { verifyToken } = require("../middleware/authValidator");

router.post("/create", verifyToken, createOrder);
router.get("/list", verifyToken, getOrders);

module.exports = router;
