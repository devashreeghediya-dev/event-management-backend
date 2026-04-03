const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    userEmail: String,
    name: String,
    date: String,
    time: String,
    venue: String,
    description: String,
    organizer: String,
    rsvp: [String], // list of emails
    imageURL: String
});

module.exports = mongoose.model("Event", eventSchema);