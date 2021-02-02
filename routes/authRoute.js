const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");
const user = require("../utils/user");

route.post("/register",authController.postRegister);
route.post("/login",[user.findByEmail],authController.postLogin);


module.exports = route