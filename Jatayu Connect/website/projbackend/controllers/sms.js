const SMS = require("../models/sms");

exports.getNumbers = (req, res) => {
    SMS.find()
    .exec((err, sms) => {
        if(err){
            return res.status(400).json({
                error: "Numbers not found"
            })
        }
        res.json(sms)
    })
}

exports.postNumbers = (req, res) => {

   const numbers = new SMS(req.body);
   numbers.save((err, number)=>{
       if(err){
           return res.status(400).json({
               err: "Not able to save in DB"
           })
       }
       res.json({
           asp: number.asp,
           dsp:number.dsp,
           pi:number.pi
       });
   })
   
}