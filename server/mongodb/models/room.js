'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
    name: String,
    seats: Number,
    calendarID: String,
});

module.exports = mongoose.model('room', roomSchema);