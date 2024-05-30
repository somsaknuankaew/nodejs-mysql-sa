const express = require("express");
const router = express.Router();
const { register, logins, auths } = require("../Controllers/auth");
//http://localhost:5000/api/register
router.post("/register", register);
router.post("/login", logins);
router.post("/auth", auths);
module.exports = router;
