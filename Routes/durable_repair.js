const express = require("express");
const {
  repairbyid,
  repairlist,
  repairsearch,
} = require("../Controllers/durable_reapir");
//const { auth } = require("../middleware/auth");
const router = express.Router();
router.get("/repairbyid/:id", repairbyid);
router.get("/repairlist/:durableid", repairlist);
router.post("/repairsearch", repairsearch);
repairsearch;
module.exports = router;
