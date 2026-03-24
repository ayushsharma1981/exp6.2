const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getBalance, deposit } = require("../controllers/accountController");

router.get("/balance", auth, getBalance);
router.post("/deposit", auth, deposit);

module.exports = router;