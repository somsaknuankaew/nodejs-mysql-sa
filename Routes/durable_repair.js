
const express = require("express");
const { repairbyid ,repairlist} = require("../Controllers/durable_reapir");
//const { auth } = require("../middleware/auth");
const router = express.Router();
router.get("/repairbyid/:id", repairbyid);
router.get("/repairlist/:durableid", repairlist);
module.exports = router;
