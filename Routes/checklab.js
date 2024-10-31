const express = require("express");
const {
  robot_VirusB,
  robot_UA,
  robot_CBC,
  robot_CTN,
  robot_FPG,
  robot_HDL,
} = require("../Controllers/check_lab");
//const { testlog } = require("../Controllers/checkrightmy");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/labvirusb", robot_VirusB);
router.post("/labua", robot_UA);
router.post("/labcbc", robot_CBC);
router.post("/labctn", robot_CTN);
router.post("/labhdl", robot_HDL);
router.post("/labfpg", robot_FPG);
module.exports = router;
