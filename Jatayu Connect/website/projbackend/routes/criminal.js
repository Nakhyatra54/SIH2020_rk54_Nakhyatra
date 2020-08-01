const express = require("express");
const router = express.Router();
require('dotenv').config()
const fast2sms = require('fast-two-sms')

const {getUserById} = require("../controllers/user")
const {isSignedIn, isAuthenticated} = require("../controllers/auth")
const {getCriminalById, criminalData, createCriminal, getCriminal, photo, sendEmail} = require("../controllers/criminal")


//all of params
router.param("userId", getUserById);
router.param("criminalId", getCriminalById);
router.param("criminalData", criminalData);

//create route
router.post("/criminal/create/:userId", isSignedIn, isAuthenticated, createCriminal)

router.get("/criminal/:userId/:criminalData", isSignedIn, isAuthenticated, getCriminal)
router.get("/criminal/photo/:userId/:criminalId", photo)
// router.post("/sendsms", sendSms)
router.post("/sendsms", async(req, res) => {
    let string = req.body.number
    let num = []
    len = req.body.number.length
    console.log(len)
    let i = len/13;
    let j = 0
    while(i>0){
        num[j] = string.slice(1, 11)
        j++;
        string = string.slice(13);
        i--;
    }
    console.log(num)
    const response = await fast2sms.sendMessage({authorization : process.env.API_KEY , message : req.body.message || 'Team Nakhytra ROCKS' ,  numbers :num })
    res.send(response)
})

router.post("/sendemail", sendEmail)


module.exports = router;

