const express = require("express");
const passport = require("passport");
const route = express.Router();
const passportConf = require("../../middleware/passport");
const googleAuthController = require("../../controller/auth/googleAuthController");

route.get("/auth/linked",
passport.authenticate('google', {scope: ['email', 'profile']}));

route.get("/auth/linked/callback", 
passport.authenticate('google'), googleAuthController.callback)

module.exports = route;