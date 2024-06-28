const express = require("express");
const router = express.Router();
const { register, logins, auths } = require("../Controllers/auth");
router.post("/register", register);
router.post("/login", logins);
router.post("/auth", auths);
module.exports = router;
