const express = require("express");
const { robot_UA } = require("../Controllers/check_lab");
const { testlog } = require("../Controllers/checkrightmy");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/labUA", auth, robot_UA);

module.exports = router;
