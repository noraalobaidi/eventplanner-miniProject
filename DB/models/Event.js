const { Schema, model } = require("mongoose");
const EventSchema = new Schema({
  organizer: { type: String, maxlength: 20 },
  name: {
    type: String,
    validate: [
      (name) => !name.toLowerCase().includes("event"),
      "Event name can't include the word event",
    ],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  image: {
    type: String,
    required: true,
  },
  numOfseats: {
    type: Number,
    min: [5, "number of seats cant be less than 5 seats"],
  },
  bookedSeats: {
    type: Number,
    default: 0,
  },

  startDate: {
    type: Date,

    validate: [(date) => date > Date.now(), "event should be in the future"],
  },
  endDate: Date,
});

EventSchema.pre("validate", function (next) {
  if (this.numOfseats < this.bookedSeats) {
    this.invalidate(
      "bookedSeats",
      `booked seats should be less or equal to ${this.numOfseats}`,
      this.bookedSeats
    );
  }
  if (this.endDate < this.startDate) {
    this.invalidate(
      "endDate",
      "endDate should be after startDate",
      this.endDate
    );
  }
  next();
});

module.exports = model("Event", EventSchema);
