const Event = require("../models/EventModel");

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Problem creating event",
    });
  }
};

const getEvents = async (req, res) => {
  const uid = req.uid;

  try {
    const events = await Event.find({ user: uid }).populate("user", "name");
  
    res.status(200).json({
      ok: true,
      events,
    });
  } catch(error){
    res.status(500).json({
      ok: false,
      msg: "Problem fetching events",
    });
  }
};

const getEvent = async (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "getEvent",
  });
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event does not exist",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not allowed to update event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent);

    res.status(201).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Problem updating event",
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event does not exist",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not allowed to delete event",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true,
      msg: "Event deleted",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Problem deleting event",
    });
  }
};

module.exports = { createEvent, getEvents, getEvent, updateEvent, deleteEvent };
