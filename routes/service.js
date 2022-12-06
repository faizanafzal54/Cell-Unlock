const router = require("express").Router();
const {
  createService,
  getAllServices,
  serivicesWithFilters,
  serviceById,
  updateService,
} = require("../controllers/service");

const {
  verifyToken,
  adminVerifyToken,
} = require("../middleware/authValidator");

router.post("/", verifyToken, adminVerifyToken, createService);
router.get("/list", verifyToken, getAllServices);
router.post("/list", verifyToken, adminVerifyToken, serivicesWithFilters);
router.get("/:id", verifyToken, adminVerifyToken, serviceById);
router.patch("/:id", verifyToken, adminVerifyToken, updateService);
module.exports = router;
