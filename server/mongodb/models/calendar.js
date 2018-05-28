'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let calendarSchema = new Schema({
    name: String,
    events: Array,
});

module.exports = mongoose.model('calendar', calendarSchema);