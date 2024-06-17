const express = require("express");
const { z100, z653, n185, z000 } = require("../Controllers/checkdiag");
const { auth } = require("../middleware/auth");
const router = express.Router();
router.post("/diagz100", auth, z100); //Case opd คนไข้สิทธิตรวจสุขภาพ(เบิกต้นสังกัด)และคนไข้สิทธิตรวจสุขภาพ(เบิกจ่ายตรง) ที่ an is not null and pdx=null
router.post("/diagz653", auth, z653); //Case opd สิทอนุเคราะห์และค่ารักษาmethamphetamine Urine(Screening) an =null pdx=null
router.post("/diagn185", auth, n185); //Case opd สิทอนุเคราะห์และค่ารักษาmethamphetamine Urine(Screening) an =null pdx=null n185
router.post("/diagz000", auth, z000); //Case opd สิทตรวจสุขภาพประจำปี ชำระเงิน ต้นสังกัด ประกันสังคม  an =null pdx=null z000
module.exports = router;
