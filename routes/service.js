const router = require("express").Router();
const {
  createService,
  getAll,
  serviceById,
  updateService,
} = require("../controllers/service");

router.post("/", createService);
router.post("/list", getAll);
router.get("/:id", serviceById);
router.patch("/:id", updateService);
module.exports = router;
