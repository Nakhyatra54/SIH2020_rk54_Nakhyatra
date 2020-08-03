const express = require("express");
const router = express.Router();

const {getNumbers, postNumbers} = require("../controllers/sms")



//create route
router.post("/sms/create", postNumbers)

router.get("/sms", getNumbers)

module.exports = router;
