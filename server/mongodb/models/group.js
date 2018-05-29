'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: String,
    users: Array,
});

module.exports = mongoose.model('group', groupSchema);