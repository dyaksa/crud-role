const express  = require("express");
const passport = require('passport');
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const cookieSession = require('cookie-session');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['cookie_key_set_up']
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");
const googlAuthRoute = require("./routes/auth/googleAuthRoute");

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
//google oauth
app.use("/api/v1/google", googlAuthRoute);

app.listen(process.env.PORT, () => {
    console.log(`server success running on port ${process.env.PORT}`);
})