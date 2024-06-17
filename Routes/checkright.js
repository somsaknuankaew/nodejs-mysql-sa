const express = require("express");
const { crights, tokenright } = require("../Controllers/checkright");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/cright", auth, crights);
router.post("/tokenright", auth, tokenright);
module.exports = router;
