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

//DB connection
mongoose.connect(process.env.DATABASE, {
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

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`app is running at ${port}`);
})
