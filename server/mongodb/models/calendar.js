'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let calendarSchema = new Schema({
    name: String,
    events: Object,
})

module.exports = mongoose.model('calendar', calendarSchema)