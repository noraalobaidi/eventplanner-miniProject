const express = require("express");
const router = express.Router();

const {
  createEvent,
  fetchAllEvents,
  fetchOneEvent,
  updateEvent,
  deleteEvent,
  fullyBookedEvents,
  eventListFetch,
  fetchSearchByName,
} = require("../../api/events/events.controllers");

router.get("/", fetchAllEvents);
router.get("/improved", eventListFetch);
router.get("/fully-booked", fullyBookedEvents);
router.get("/query/:query", fetchSearchByName);
router.get("/:eventId", fetchOneEvent);
router.post("/", createEvent);
router.put("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
