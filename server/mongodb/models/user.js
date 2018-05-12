'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    user: String,
    password: String
});

module.exports = mongoose.model('user', usersSchema);