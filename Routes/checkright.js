const express = require("express");
const {
  crightslist,
  tokenright,
  inscrightlog,
  rrightlogid,
} = require("../Controllers/checkright");
const { testlog } = require("../Controllers/checkrightmy");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/crightslist", auth, crightslist);
router.post("/tokenright", auth, tokenright);
router.post("/inscrightlog", auth, inscrightlog);
router.post("/crightlog", auth, rrightlogid);
router.post("/testlog", testlog);
module.exports = router;
