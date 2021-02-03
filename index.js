const express  = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");

app.get("/",(req,res) => {
    res.status(200).send({
        status: 200,
        message: "server success running"
    })
})

//auth
app.use("/api/v1/user", authRoutes);
//event
app.use("/api/v1/event", eventRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server success running on port ${process.env.PORT}`);
})