const router = require("express").Router();
const { createService, getAll } = require("../controllers/service");

router.post("/", createService);
router.get("/", getAll);
module.exports = router;
