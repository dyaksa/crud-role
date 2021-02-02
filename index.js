const express  = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const authRoutes = require("./routes/authRoute");

app.get("/",(req,res) => {
    res.status(200).send({
        status: 200,
        message: "server success running"
    })
})

//register new user
app.use("/api/v1/user", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server success running on port ${process.env.PORT}`);
})