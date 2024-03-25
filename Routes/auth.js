const express = require("express");
const router = express.Router();
const { register, logins } = require("../Controllers/auth");
//http://localhost:5000/api/register
router.post("/register", register);
router.post("/login", logins);
module.exports = router;
