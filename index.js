const express  = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.status(200).send({
        status: 200,
        message: "server success running"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server success running on port ${process.env.PORT}`);
})