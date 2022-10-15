const router = require("express").Router();
const {
  createService,
  getAllServices,
  serivicesWithFilters,
  serviceById,
  updateService,
} = require("../controllers/service");

router.post("/", createService);
router.get("/list", getAllServices);
router.post("/list", serivicesWithFilters);
router.get("/:id", serviceById);
router.patch("/:id", updateService);
module.exports = router;
