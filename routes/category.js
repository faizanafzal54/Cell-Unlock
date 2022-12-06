const router = require("express").Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} = require("../controllers/category");
const {
  verifyToken,
  adminVerifyToken,
} = require("../middleware/authValidator");

router.post("/create", verifyToken, adminVerifyToken, createCategory);
router.get("/list", verifyToken, adminVerifyToken, getCategories);
router.get("/:id", verifyToken, adminVerifyToken, getCategoryById);
router.patch("/:id", verifyToken, adminVerifyToken, updateCategory);

module.exports = router;
