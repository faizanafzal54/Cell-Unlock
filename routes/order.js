const router = require("express").Router();
const { listOfOrder } = require("../controllers/order");
const { verifyToken } = require("../middleware/authValidator");

// router.post("/create", verifyToken, );
router.get("/list", verifyToken, listOfOrder);

module.exports = router;
