const router = require("express").Router();
const { login } = require("../controllers/user");
const { verifyToken } = require("../middleware/authValidator");

router.get("/", (req, res) => {
  res.sendStatus(200);
});
router.post("/login", login);
module.exports = router;
