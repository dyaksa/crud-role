const express = require('express');
const route = express.Router();
const eventController = require("../controller/eventController");
const { verifyToken, isSuperAdmin } = require("../middleware/is-auth");


route.get("/",[ verifyToken, isSuperAdmin ],eventController.getEvents);
route.get("/:id",[ verifyToken, isSuperAdmin ],eventController.getEventById);
route.post("/",[verifyToken, isSuperAdmin],eventController.createEvents);

module.exports = route