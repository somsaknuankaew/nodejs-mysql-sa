const express = require("express");
const { z100, crights } = require("../Controllers/checkdiag");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/diagz100", auth, z100);
router.post("/cright", auth, crights);
module.exports = router;
