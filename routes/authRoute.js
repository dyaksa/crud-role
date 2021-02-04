const express = require("express");
const passport = require("passport");
const route = express.Router();
const authController = require("../controller/authController");
const passportConf = require("../middleware/passport");

route.post("/register",authController.register);
route.post("/login",authController.login);


module.exports = route