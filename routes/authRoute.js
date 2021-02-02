const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");

route.post("/register",authController.postRegister);
route.post("/login",authController.postLogin);


module.exports = route