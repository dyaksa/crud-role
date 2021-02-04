const express = require('express');
const route = express.Router();
const eventController = require("../controller/eventController");
const { verifyToken, isSuperAdmin } = require("../middleware/is-auth");


route.get("/",[ verifyToken, isSuperAdmin ],eventController.getEvents);
route.get("/:id",[ verifyToken, isSuperAdmin ],eventController.getEventById);
route.post("/",[verifyToken, isSuperAdmin],eventController.createEvents);
route.patch("/:id", [verifyToken, isSuperAdmin], eventController.updatedEvent);
route.delete("/:id", [ verifyToken, isSuperAdmin], eventController.deleteEvent);

module.exports = route