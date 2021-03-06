const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const Event = require("./../Models/eventModel");


module.exports.getEvent = (request, response, next) => {
  let id = request.query.eventId;
  Event.find({ _id: id })
    .populate('mainSpeaker')
    .populate('otherSpeakers')
    .populate('students')
    .then(data => response.status(200).json(data))
    .catch(error => next(error));
}

module.exports.getEventsData = (request, response, next) => {
  if (request.body.role == 'speaker') {
    Event.find({ mainSpeaker: request.body.id, otherSpeakers: request.body.id })
      .populate('mainSpeaker')
      .populate('otherSpeakers')
      .populate('students')
      .then(data => response.status(200).json(data))
      .catch(error => next(error));
  } else if (request.body.role == 'student') {
    Event.find({ students: request.body.id })
      .populate('mainSpeaker')
      .populate('otherSpeakers')
      .populate('students')
      .then(data => response.status(200).json(data))
      .catch(error => next(error));
  } else if (request.body.role == 'admin') {
    Event.find()
      .populate('mainSpeaker')
      .populate('otherSpeakers')
      .populate('students')
      .then(data => response.status(200).json(data))
      .catch(error => next(error));
  } else {
    next(new Error('undefined role'));
  }
}

module.exports.addEvent = (request, response, next) => {
  let result = validationResult(request);
  if (result.isEmpty()) {
    let message = result.array().reduce((current, error) => current + error.msg + " ", " ");
    let error = new Error(message);
    error.status = 422;
    throw error;
  }
  let newEvent = new Event({
    title: request.body.title,
    date: request.body.date,
    mainSpeaker: request.body.mainSpeakerId,
    otherSpeakers: request.body.otherSpeakers,
    students: request.body.students,
  });
  newEvent.save()
    .then((data) => {
      response.status(201).json({ message: "Event Added!", newEvent });
    })
    .catch(error => next(error));
}

module.exports.deleteEvent = (request, response, next) => {
  let id = request.query.eventId;
  Event.findOneAndRemove({ _id: id }, (error) => {
    if (!error) {
      response.status(200).json({ message: "Event Deleted Successfully!" });
    } else {
      next(new Error("Can't delete Event from system"));
    }
  });
}

module.exports.updateEventByTitle = async (request, response, next) => {
  if (request.body.flag != undefined) {
    try {
      let event = await Event.findOne({ title: request.body.title });
      if (request.body.otherSpeakers != undefined) {
        for (let i = 0; i < request.body.otherSpeakers.length; i++) {
          if (!event.otherSpeakers.includes(request.body.otherSpeakers[i])) {
            event.otherSpeakers.push(request.body.otherSpeakers[i]);
          }
        }
      }
      if (request.body.students != undefined) {
        for (let i = 0; i < request.body.students.length; i++) {
          if (!event.students.includes(request.body.students[i])) {
            event.students.push(request.body.students[i]);
          }
        }
      }
      console.log(event);
      event.save();
      response.status(200).json({ message: "Event members Updated Successfully!" });
    } catch (error) {
      next(new Error(error));
    }

  } else {
    Event.findOneAndUpdate({ title: request.body.oldTitle }, request.body, { new: true }, (error, doc) => {
      if (!error) {
        if (doc != null) {
          response.status(200).json({ message: "Event Updated Successfully!" });
        } else {
          next(new Error("Can't find event"));
        }
      } else {
        next(new Error(error));
      }
    });
  }
}