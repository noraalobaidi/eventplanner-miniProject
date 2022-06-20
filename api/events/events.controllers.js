const Event = require("C:/Users/HP/Development/eventplanner-miniProject/DB/models/Event");

exports.eventListFetch = async (req, res, next) => {
  try {
    const events = await Event.find(
      {
        // $expr: { $gte: [req.body.startDate, "$startDate"] }
      },
      {
        __id: true,
        name: true,
        startDate: true,
      },
      {
        sort: { startDate: "asc", name: "asc" },
      }
    );
    res.json(events);
  } catch (error) {
    next(error);
  }
};
exports.fetchAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.fetchOneEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event does not exsist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findById(eventId);
    if (foundEvent) {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
        new: true,
      });
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Account does not exsist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const foundEvent = await Event.findById(eventId);
    if (foundEvent) {
      await foundEvent.remove();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account does not exsist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.fullyBookedEvents = async (req, res) => {
  const events = await Event.find({
    $expr: { $eq: ["$numOfseats", "$bookedSeats"] },
  });
  // const events = await Event.find({ numOfseats: { $eq: bookedSeats } });
  //const events=await Event.aggregate([{$match:{$eq:['$numOfseats','$bookedSeats']}}]);
  //   const events = await Event.find({
  //     $where: "this.numOfseats==this.bookedSeats",
  //   });
  //const events = await Event.find().where("numOfseats").eq("bookedSeats");
  //$where('this.firstname === this.lastname')
  //const events= await Event.$where('this.bookedSeats=== this.numOfseats');
  res.json(events);
};
exports.fetchSearchByName = async (req, res) => {
  const { query } = req.params;
  
    try {
      const events = await Event.find({
        name: { $regex: query, $options: "i" },
      });
      res.json(events);
    } catch (error) {
      next(error);
    }
};
