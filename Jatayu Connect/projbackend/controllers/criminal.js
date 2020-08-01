const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const Criminal = require("../models/criminal")
const Base64 = require('js-base64').Base64;
const { base64encode, base64decode } = require('nodejs-base64');
var unirest = require("unirest");
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = (req,res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, //|| 'abc@gmail.com', // TODO: your gmail account
            pass: process.env.PASSWORD //|| '1234' // TODO: your gmail password
        }
    });
    console.log(req.body.to)
    // Step 2
    let mailOptions = {
        from: 'nakhyatra@gmail.com', // TODO: email sender
        to: req.body.to, // TODO: email receiver
        subject: req.body.subject || 'Not included',
        cc: req.body.cc || "none",
        text: req.body.message || 'A message without body.'
    };
    
    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            // return log('Error occurs');
            console.log("Error Occured!!!!")
            res.send(err)
        }
        // return log('Email sent!!!');
        res.send("Email sent!")
    });
}

exports.getCriminalById = (req, res, next, id) => {
    Criminal.findById(id)
    .exec((err, criminal) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.criminal = criminal;
        next();
    })
}



exports.criminalData = (req, res, next) => {
    Criminal.find()
    .exec((err, criminal) => {
        if(err){
            return res.status(400).json({
                error: "Criminal not found"
            })
        }
        req.criminal = criminal;
        next();
    })
}

exports.getCriminal = (req, res) => { 
    
    return res.json(req.criminal);
}

// exports.sendSms = (req, res) => {
//     var sms = unirest("POST", "https://www.fast2sms.com/dev/bulk");

//         sms.headers({
//         "authorization": "AtXj8qR6YVDf3vrU2oksn1HGIb0dO9EWcCuLFhJxNgaPwmeKTzTHSdYPhCxZfpluW8NLXvIO7w6qRsFt"
//         });
//         console.log(req.number)
//         sms.form({
//         "sender_id": "FSTSMS",
//         "message": "This is a test message",
//         "language": "english",
//         "route": "p",
//         // "numbers": req.number
//         "numbers": "7002725767",
//         });

//         sms.end(function (res) {
//         if (res.error) throw new Error(res.error);

//         console.log(sms.body);
//         return sms.body
//         });
// }

exports.createCriminal = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        //destructure the fields
        const {firstName, lastName, email, address, motherName, fatherName, spouseName, school, college, criminalRecord, birthDatePlace, nickName, contact} = fields;
        
        if(
            !firstName || !lastName 
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }

        let criminal = new Criminal(fields)

        //handle file here
        if(file.criminalImage){
            if(file.criminalImage.size > 3000000){
                return res.status(400).json({
                    error: "File size to big!"
                })
            }
            buff = fs.readFileSync(file.criminalImage.path)
            criminal.criminalImage = new Buffer.from(buff).toString("base64")
        }

        if(file.fingerprintImage){
            if(file.fingerprintImage.size > 3000000){
                return res.status(400).json({
                    error: "File size to big!"
                })
            }
            buff = fs.readFileSync(file.fingerprintImage.path)
            criminal.fingerprintImage = new Buffer.from(buff).toString("base64")
        }

        if(file.ratinaImage){
            if(file.ratinaImage.size > 3000000){
                return res.status(400).json({
                    error: "File size to big!"
                })
            }
            buff = fs.readFileSync(file.ratinaImage.path)
            criminal.ratinaImage = new Buffer.from(buff).toString("base64")
        }

        if(file.motherImage){
            if(file.motherImage.size > 3000000){
                return res.status(400).json({
                    error: "File size to big!"
                })
            }
            buff = fs.readFileSync(file.motherImage.path)
            criminal.motherImage = new Buffer.from(buff).toString("base64")
        }
        if(file.fatherImage){
            if(file.fatherImage.size > 3000000){
                return res.status(400).json({
                    error: "File size to big!"
                })
            }
            buff = fs.readFileSync(file.fatherImage.path)
            criminal.fatherImage = new Buffer.from(buff).toString("base64")
        }
        if(file.spouseImage){
            if(file.spouseImage.size > 3000000){
                return res.status(400).json({
                    error: "File size to big!"
                })
            }
            buff = fs.readFileSync(file.spouseImage.path)
            criminal.spouseImage = new Buffer.from(buff).toString("base64")
        }
        

        //save to the DB
        criminal.save((err, criminal) => {
            if(err){
                return res.status(400).json({
                    error: "Saving t shirt in DB failed!"
                })
            }
            res.json(criminal)
        })
    })
}




//middleware
exports.photo = (req, res, next) => {
    if(req.criminal.photo.data){
        res.set("Content-Type", req.criminal.photo.contentType)
        return res.send(req.criminal.photo.data)
    }
    next();
}