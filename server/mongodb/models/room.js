'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let roomSchema = new Schema({
    id: Number,
    name: String,
    seats: Number,
    calendar: Number,
})

module.exports = mongoose.model('room', roomSchema)