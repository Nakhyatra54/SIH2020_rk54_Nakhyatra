require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const criminalRoutes = require("./routes/criminal");
const smsRoutes = require("./routes/sms");


//DB connection
// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }).then(()=>{
//     console.log("DB CONNECTED");
// });

mongoose.connect('mongodb://nakhyatra:nakhyatra@cluster0-shard-00-00.xh6k9.mongodb.net:27017,cluster0-shard-00-01.xh6k9.mongodb.net:27017,cluster0-shard-00-02.xh6k9.mongodb.net:27017/sih?ssl=true&replicaSet=atlas-zxdhtm-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED");
});

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: false})) /// new code written on 26-07-2020 after frontend sendsms page is made

//routes-
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", criminalRoutes);
app.use("/api", smsRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`app is running at ${port}`);
})
