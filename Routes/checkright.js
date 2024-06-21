const express = require("express");
const {
  crightslist,
  tokenright,
  inscrightlog,
  rrightlogid,
} = require("../Controllers/checkright");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/crightslist", auth, crightslist);
router.post("/tokenright", auth, tokenright);
router.post("/inscrightlog", auth, inscrightlog);
router.get("/crightlog/:vn", auth, rrightlogid);
module.exports = router;
