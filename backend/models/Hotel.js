const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  type: String,
  available: Boolean,
  startDate: Date,
  endDate: Date
});

const HotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: [RoomSchema]
});

module.exports = mongoose.model('Hotel', HotelSchema);
